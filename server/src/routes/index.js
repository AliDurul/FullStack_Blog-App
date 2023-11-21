const router = require("express").Router();

//users
router.use("/users", require("./user"));

// categories
router.use("/api", require('./blogComLikCa'))



module.exports = router;
