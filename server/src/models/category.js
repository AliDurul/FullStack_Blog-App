"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require('mongoose')
/* ------------------------------------------------------- *
{
  "name": "AI"
}
/* ------------------------------------------------------- */
// Token Model:

const CategorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true
    }, 

}, { collection: 'categories', timestamps: true })

/* ------------------------------------------------------- */
module.exports = model('Category', CategorySchema)