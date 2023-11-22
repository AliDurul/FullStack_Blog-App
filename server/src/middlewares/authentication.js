
const Token = require('../models/token')

module.exports = async (req,res,next) => {
  
    const auth = req.headers?.authorization || null 
    const token = auth ? auth.split(' ')[1] : null

    if(token){
        const tokenData = await Token.findOne({token}).populate('user_id')
        req.user = tokenData ?  tokenData.user_id : undefined
    }

    next()
}