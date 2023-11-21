"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Blog Controller:
const Blog = require("../models/blog");
const View = require("../models/view");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Blog);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Blog),
      data,
    });
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
    /* 
        const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  visitors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;

// ------------------------------------------------------------

// Blog görüntüleme
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Kullanıcının daha önce bu blogu görmüş olup olmadığını kontrol et
    const userId = 'kullaniciId'; // Kullanıcı ID'sini buraya eklemelisiniz
    if (!blog.visitors.includes(userId)) {
      // Kullanıcı daha önce bu blogu görmediyse, görüntüleme sayısını bir arttır
      blog.views += 1;
      blog.visitors.push(userId);
      await blog.save();
    }

    return res.json(blog);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});
        
        */

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

    const data = await Blog.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
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
    const data = await Blog.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
