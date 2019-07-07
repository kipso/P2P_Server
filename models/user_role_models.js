const db = require('../database/database');
const Sequelize = require('sequelize');
const User = require('./user_models');

// Define a User_role Model with the proper attributes and their options 
const User_role = db.define('user_role', {
    // attributes
    role: {
      type: Sequelize.STRING,
      allowNull: false,
      field: 'role' 
    }
  }, {
    tableName: 'user_roles'
  });

//Create a relation to User table:
User_role.associate = function (models) {
    models.User_role.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };

  module.exports = User_role;