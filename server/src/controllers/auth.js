const User = require("../models/user");

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

    




    console.log(user);

    res.send({
      msg: "login",
    });
  },
};
