const Users = require("../Dao/models/users.model");

const GET_USERS = () => {
  return Users.find();
};

const GET_ONE_USER = (userId) => {
  return Users.findOne(userId);
};

const GET_USER_BY_ID = (userId) => {
  return Users.findById(userId);
};

const CREATE_USER = (newUserData) => {
  return Users.create(newUserData);
};

const UPDATE_USER = (userId, userData) => {
  return Users.findByIdAndUpdate(userId, userData, { new: true });
};

const DELETE_USER = (userId) => {
  return Users.findByIdAndDelete(userId);
};

const DELETE_ALL_USERS = () => {
  return Users.deleteMany({});
};

module.exports = {
  GET_USERS,
  GET_USER_BY_ID,
  GET_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS
};
