const Users = require("../Dao/models/users.model");
const messageRepository = require("../repositories");

const GET_USERS = () => {
  return Users.find();
};

const GET_ONE_USER = (userId) => {
  return Users.findOne(userId);
};

const GET_USER_BY_ID = (userId) => {
  return Users.findById(userId);
};

const CREATE_USER = async (newUserData) => {
  try {
    const newUser = await Users.create(newUserData);

    const messageInfo = {
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      number: newUser.number,
    };

    messageRepository.sendMessage(messageInfo);

    return newUser;
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error}`);
  }
};

const UPDATE = (userId, userData) => {
  return Users.findOneAndUpdate(userId, userData, { new: true });
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
  UPDATE,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS,
};
