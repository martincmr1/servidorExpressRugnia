const mongoose = require('mongoose');

const userCollection = 'user'

const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    age: Number,
    password: String,

})

const Users = mongoose.model(userCollection, userSchema)

module.exports = Users