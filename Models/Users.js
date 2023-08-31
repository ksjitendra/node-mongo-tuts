const mongoose = require('mongoose')

const { Schema } = mongoose

const users = new Schema({
    name:  { type: String, required: true } , 
    email: String,
    password: String,
    user_type: Number,
    age: Number
}, {
    timestamps: true
})

const userModel = mongoose.model('users', users)

module.exports = userModel