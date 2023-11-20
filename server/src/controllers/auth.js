const User = require('../models/user')

module.exports = {
    login: async (req, res) => {
      res.send({
        msg:'login'
      })
    }
}