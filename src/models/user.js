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
    },
    bio: {
        type: String,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
},{ collection: 'users', timestamps: true })
/* ------------------------------------------------------- */
// Schema Configs:
UserSchema.pre(['save', 'updateOne'], function (next) {

    const data = this?._update || this

    if (data?.password) {
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,])[A-Za-z\d@$!%*?&+.,].{8,}$/.test(data?.password)

        if (isPasswordValidated) {
            this.password = data.password = passwordEncrypt(data.password)
        } else {
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