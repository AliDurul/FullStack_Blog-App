"use strict"
/* -------------------------------------------------------
    USERS BLOGG APP
------------------------------------------------------- */
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "first_name": "admin",
    "last_name": "admin",
    "image":"",
    "bio":"",
    "isAdmin": true
}
/* ------------------------------------------------------- */
const { Schema, model } = require('mongoose')
const {isEmail} = require("validator");
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
        validate: [isEmail, "Email type is not correct."],
        index: true
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
​
},{ collection: 'users', timestamps: true })
/* ------------------------------------------------------- */
// Schema Configs:

UserSchema.pre('save', function(next){

    if(this.password){
            // pass == (min 1: lowerCase, upperCase, Numeric, @$!%*?& + min 8 chars)
        const isPasswordValidated = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+.,]).{8,}$/.test(this.password)

        if(isPasswordValidated){
            this.password = passwordEncrypt(this.password)
        }else{
            next(new Error('Password not validated.'))
        }

        next()
    }

})

UserSchema.pre('init', function (data) {
    data.id = data._id
})


module.exports = model('User',UserSchema )