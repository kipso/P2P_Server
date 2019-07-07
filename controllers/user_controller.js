const Sequelize = require('sequelize');
const User =  require('../models/user_models');
const User_role = require('../models/user_role_models');


exports.user_signup = function (req, res, next) {
    //Check for Admin Exist in user_role
    User_role.findAll({
        where: {
          role: 'Admin'
        }
    }).then(data => {
        //If Admin Exist Check for the "User" role to prevent duplicate
        if(data.length){
            User_role.findAll({
                where: {
                    role: 'User'
                }
            }).then(data => {
                //If Admin and User both exist we just took the role_id and create a User row in DB.
                if(data.length){
                   role_id = data[0]['dataValues']['id'];
                   User.create({ firstName: req.body.firstName, lastName: req.body.lastName, roleId: role_id }).then(user => {
                    res.locals.message = "User created";
                    res.locals.role = "User";
                    next();
                });
                } else {
                    //If User doesn't Exist Create a User role and Reference that Id to user Table
                    var userRole = "User";
                    User_role.create({role:userRole}).then(role => {
                        User.create({ firstName: req.body.firstName, lastName: req.body.lastName, roleId: role.id }).then(user => {
                            res.locals.message = "User created";
                            res.locals.role = "User";
                            next();
                        });
                    })
                }
            });
        } else{
            //If Admin doesn't Exist Create Admin role and Refence that Id to that corresponding user.
            var userRole = "Admin";
            User_role.create({role:userRole}).then(role => {
                User.create({ firstName: req.body.firstName, lastName: req.body.lastName, roleId: role.id }).then(user => {
                    res.locals.message = "user created";
                    res.locals.role = "Admin";
                    next()
                });
            });
        }
    })
};