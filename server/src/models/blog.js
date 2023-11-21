"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { Schema, model } = require("mongoose");
/* ------------------------------------------------------- *

/* ------------------------------------------------------- */
// Blog Model:

const Category = require("./category");

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
      default: [],
    },
    likes: {
      type: Number,
      default: 0
    },
  },
  { collection: "blogs", timestamps: true }
);

BlogSchema.pre("save", async function (next) {
  // category alanına bağlı kategori bilgisini al
  const category = await Category.findOne(this.category);

  // category_name'i belirle
  this.category_name = category ? category.name : "Default Category";

  // sonraki adıma geç
  next();
});

/* ------------------------------------------------------- */
module.exports = model("Blog", BlogSchema);
