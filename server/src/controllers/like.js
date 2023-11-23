"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Like Controller:
const Like = require("../models/like");
const Blog = require("../models/blog");

module.exports = {
  create: async (req, res) => {
    req.body.user_id = req.user._id;
    req.body.post_id = req.params.id;
    

    let likes = await Like.findOne({
      user_id: req.user._id,
      post_id: req.params.id,
    });

    if (likes) await Like.deleteOne({ _id: likes._id });
    else await Like.create({ user_id: req.user._id, post_id: req.params.id });

    const likesOfpost = await Like.find({ post_id: req.params.id });
    

    await Blog.updateOne({ _id: req.params.id }, { likes_n: likesOfpost });

    res.status(201).send({
      error: false,
    });
  },
};
