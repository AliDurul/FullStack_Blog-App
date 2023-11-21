"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Like Controller:
const Like = require("../models/like");
const Blog = require("../models/blog");

// Token 8684b4b50611141091810216adcf67e22c874c1f4ed16e4d80e71758339a0661
// Token 12e6d07aa705812c04e6379f4e03d1bfb79ed7bd0a9323b414888f52c191677b

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
