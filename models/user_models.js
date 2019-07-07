const db = require('../database/database');
const Sequelize = require('sequelize');

const User_role = require('./user_role_models');

// Define a User Model with the proper attributes and their options 
const User = db.define('user', {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'firstName' 
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'lastName'
    },
    roleId: {
        type: Sequelize.INTEGER,
        references: {
            model: User_role,
            key: "id"
        }
    }
  }, {
    tableName: 'users'
  });

  // create a relation to User_role model  
  User.associate = function(models) {
    models.User.hasOne(models.User_role);
  };
  

  module.exports = User;