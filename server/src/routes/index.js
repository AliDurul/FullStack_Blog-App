const router = require("express").Router();

//users
router.use("/users", require("./user"));

// categories
router.use("/api", require('./blogComLikCat'))



module.exports = router;
