"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Blog Model:


const BlogSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["p", "d"],
      default: "d",
    },

    comments: [],

    category_name: {
      type: String,
      trim: true,
      default: async function () {
        const categories = await Category.findOne(this.category);
        return categories.name;
      },
    },
    post_views: {
      type: Number,
      default: 0,
    },
    comment_count: {
      type: Number,
      default: 0,
    },
    likes_n: {
        type: Array,
        default: []
    },
    likes: {
        type: Number,
        default: 0 ,
        transform: function(){this.likes_n.lenght}
      },
  },
  { collection: "blogs", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = model("Blog", BlogSchema);
