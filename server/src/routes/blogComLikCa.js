"use strict";
/* -------------------------------------------------------
    EXPRESS_JS - BLOG-API Router
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/users:

const category = require("../controllers/category")


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
  .get(category.list).post(category.create);

router
  .route("/blogs/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);

// likes  routes
router.route("/likes")
  .get(category.list).post(category.create);

router
  .route("/likes/:id")
  .get(category.read)
  .put(category.update)
  .patch(category.update)
  .delete(category.delete);


/* ------------------------------------------------------- */
module.exports = router;
