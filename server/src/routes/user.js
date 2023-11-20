"use strict";
/* -------------------------------------------------------
    EXPRESS_JS - BLOG-API Router
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/users:
const user = require("../controllers/user");
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