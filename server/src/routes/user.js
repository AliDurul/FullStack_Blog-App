"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG-API Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/category:

const user = require("../models/user");

// URL

router.route("/").get(user.list).post(user.create);

router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

  /* ------------------------------------------------------- */

  module.exports = router