"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Comment Controller:
const Comment = require("../models/comment");
const Blog = require("../models/blog");

module.exports = {
  create: async (req, res) => {
    req.body.user = req.user._id;
    req.body.post = req.params.id;

    await Comment.create(req.body);

    const commentsOfBlog = await Comment.find({ post: req.params.id });

    await Blog.updateOne({ _id: req.params.id }, { comments: commentsOfBlog });


    res.status(201).send({
      error: false,
    });
  },
  update: async (req, res) => {
    const data = await Comment.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      data,
      new: await Comment.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Comment.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
