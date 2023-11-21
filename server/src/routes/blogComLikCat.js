"use strict";
/* -------------------------------------------------------
    EXPRESS_JS - BLOG-API Router
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/users:

const category = require("../controllers/category")
const blog = require("../controllers/blog")
const like = require("../controllers/like")



// category routes
router.route("/categories")
  .get(category.list).post(category.create);

router
  .route("/categories/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);


// comment routes
router.route("/comments")
  .get(category.list).post(category.create);

router
  .route("/comments/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

// blog  routes
router.route("/blogs")
  .get(blog.list).post(blog.create);

router
  .route("/blogs/:id")
  .get(blog.read)
  .put(blog.update)
  .patch(blog.update)
  .delete(blog.delete);

// likes  routes


router.route("/likes/:id").get(like.create)
 
 
 


/* ------------------------------------------------------- */
module.exports = router;
