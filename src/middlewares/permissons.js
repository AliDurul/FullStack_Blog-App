"use strict";

module.exports = {
  isLogin: (req, res, next) => {
    if (process.env.NODE_ENV == "development") return next();

    if (req?.user) next();
    else {
      res.errorStatusCode = 403;
      throw new Error("No Permissoons, You must login!");
    }
  },
  isAdmin: (req, res, next) => {

    if (process.env.NODE_ENV == "development") return next();

    if (req?.user?.isAdmin) next();
    else {
      res.errorStatusCode = 403;
      throw new Error("No Permissoons, You must login and to be Admin!");
    }
  },
};
