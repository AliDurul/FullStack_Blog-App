const morgan = require("morgan");
const fs = require("fs");

const today = new Date().toISOString().split('T')[0]


module.exports = morgan(
  "combined",
  { stream: fs.createWriteStream(`./logs/${today}.log`) },
  { flags: "a+" }
);
