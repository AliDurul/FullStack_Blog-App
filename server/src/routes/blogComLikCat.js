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
const comment = require("../controllers/comment")
const permissons = require('../middlewares/permissons')



// category routes
router.route("/categories")
  .get(category.list)
  .post(permissons.isAdmin, category.create);

router
  .route("/categories/:id")
  .get(permissons.isLogin, category.read)
  .put(permissons.isAdmin, category.update)
  .patch(permissons.isAdmin, category.update)
  .delete(permissons.isAdmin, category.delete);


// comment routes
router.route("/comments/:id")
  .post(permissons.isLogin, comment.create)
  .put(permissons.isLogin, comment.update)
  .delete(permissons.isLogin, comment.delete);

// blog  routes
router.route("/blogs")
  .get(blog.list)
  .post(permissons.isLogin, blog.create);

router
  .route("/blogs/:id")
  .get(permissons.isLogin,blog.read)
  .put(permissons.isLogin,blog.update)
  .patch(permissons.isLogin,blog.update)
  .delete(permissons.isLogin,blog.delete);

// likes  routes
router.route("/likes/:id").post(permissons.isLogin, like.create)
 
 
 


/* ------------------------------------------------------- */
module.exports = router;
