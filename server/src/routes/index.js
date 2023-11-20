const router = require("express").Router();
//users
router.use("/users", require("./user"));



module.exports = router;
