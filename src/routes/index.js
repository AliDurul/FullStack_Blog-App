const router = require("express").Router();

//users
router.use("/users", require("./user"));

// categories
router.use(require('./blogComLikCat'))



module.exports = router;
