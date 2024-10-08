const User = require("../models/user");
const Token = require("../models/token");

const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password)) {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
    }

    const user = await User.findOne({
      $or: [{ username }, { email }],
      password: passwordEncrypt(password),
    });

    if (!user) {
      res.errorStatusCode = 401;
      throw new Error("Wrong username/email or password.");
    }

    let tokenData = await Token.findOne({ user_id: user._id });
   
    if(!tokenData) tokenData = await Token.create({user_id:user._id, token: passwordEncrypt( user._id + Date.now()) })


    res.send({
      key: tokenData.token,
      user
    });
  },


  logout: async (req,res) => {

    
    const auth = req?.headers?.authorization || null

    const  token = auth ? auth.split(' ')[1] : null


    if(token) await Token.deleteOne({token})
      
    
    res.send({
      error:false,
      message: 'User loged out'
    })

  }


};
