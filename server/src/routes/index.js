const router = require('express').Router()

// user
router.use('/users', require('./user'))


module.exports = router