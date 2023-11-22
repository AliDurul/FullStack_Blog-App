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
      type: String,
      trim: true,
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
    },
  },
  { collection: "comments", timestamps: true }
);

CommentSchema.pre("init", function (data) {
  data.id = data._id;
});

/* ------------------------------------------------------- */
module.exports = model("Comment", CommentSchema);
