'use strict';
const {
  Model, Op
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: `Email must be unique!` },
      validate: {
        notNull: { msg: `Email is required!` },
        notEmpty: { msg: `Email is required!` },
        isEmail: { msg: `Invalid email format!` }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: `Password is required!` },
        notEmpty: { msg: `Password is required!` },
        len: { args: [5, Infinity], msg: `Password required minimum 5 characters!` }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance) {
        const hashedPass = hashPass(instance.password)
        instance.password = hashedPass
      }
    }
  });
  return User;
};