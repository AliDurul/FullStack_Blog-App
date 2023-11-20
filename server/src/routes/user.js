"use strict";
/* -------------------------------------------------------
    EXPRESS_JS - BLOG-API Router
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/users:
const user = require("../controllers/user");
const auth = require("../controllers/auth");

// user routes
router.route("/")
  .get(user.list)

router.route("/register").post(user.create);



router
  .route("/:id")
  .get(user.read)
  .put(user.update)
  .patch(user.update)
  .delete(user.delete);

// auth routes
router.route("/auth/login").post(auth.login);
router.route("/auth/logout").post(auth.logout);

/* ------------------------------------------------------- */
module.exports = router;
