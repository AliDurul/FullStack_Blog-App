"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:
const Blog = require("../models/blog");
const View = require("../models/view");
const Comment = require("../models/comment");
const Like = require("../models/like");

module.exports = {
  list: async (req, res) => {
    let filters = {};

    filters = { status: "p" };

    if (req?.query?.author && req.user.username === req?.query?.author)
      filters = req.query;
    if (req?.query?.author && !(req.user.username === req?.query?.author))
      throw new Error("You can only see your own blog");

    const data = await res.getModelList(Blog, filters, 'category');

    res.status(200).send(data);
  },

  create: async (req, res) => {
    req.body.author = req.user.username;

    const data = await Blog.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    let views = await View.findOne({ post_id: req.params.id });

    if (!views) views = await View.create({ post_id: req.params.id });

    const viewedBySet = new Set(views.viewedBy);

    viewedBySet.add(req.user._id.toString());

    await Blog.updateOne(
      { _id: req.params.id },
      { post_views: viewedBySet.size }
    );

    await View.updateOne(
      { post_id: req.params.id },
      { viewedBy: [...viewedBySet] }
    );

    const data = await Blog.findOne({ _id: req.params.id }).populate('category');
    res.status(200).send(data);
  },
  update: async (req, res) => {
    const data = await Blog.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      data,
      new: await Blog.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });

    const author = blog?.author;
    let data;

    if (req.user.username === blog?.author || req.user.isAdmin) {
      data = await Blog.deleteOne({ _id: req.params.id });

      await Comment.deleteMany({ post: req.params.id });
      await Like.deleteMany({ post_id: req.params.id });
      await View.deleteMany({ post_id: req.params.id });
    } else throw new Error("You can only delte your own comment!");

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
