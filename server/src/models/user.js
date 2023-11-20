"use strict"
/* -------------------------------------------------------
    USERS BLOG APP
------------------------------------------------------- */
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA?123456",
    "email": "admin@site.com",
    "first_name": "admin",
    "last_name": "admin",
    "image":"",
    "bio":"",
    "isAdmin": true
}
/* ------------------------------------------------------- */
const { Schema, model } = require('mongoose')
const { isEmail } = require('validator') // for Validate process : npm i validator
const passwordEncrypt = require('../helpers/passwordEncrypt')
// User Model:
const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        index: true,
        validate: [isEmail, "Email type is not correct"]
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
        required: false
    },
    bio: {
        type: String,
        trim: true,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{ collection: 'users', timestamps: true })
/* ------------------------------------------------------- */
// Schema Configs:
UserSchema.pre('save', function(next){
    if(this.password){
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,])[A-Za-z\d@$!%*?&+.,].{8,}$/.test(data.password)
        if(isPasswordValidated){
            this.password = passwordEncrypt(this.password)
        }else{
            next(new Error("Password not validated."))
        }
        next()
    }
})
UserSchema.pre('init', function (data) {
    data.id = data._id
})
/* ------------------------------------------------------- */
module.exports = model('User', UserSchema)