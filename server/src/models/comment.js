"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Comment Model:

const CommentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            trim: true,
            required: true,
        },

        post: {
            type: Schema.Types.ObjectId,
            ref: "Blog",
            required: true,
        }
    },
    { collection: "comments", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Comment", CommentSchema);