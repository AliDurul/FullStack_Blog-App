"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require('mongoose');
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Like Model:

const LikeSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        },
        
    },
    { collection: "likes", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Like", LikeSchema);