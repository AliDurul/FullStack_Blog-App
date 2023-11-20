const { connect } = require("mongoose");

module.exports = function () {
  connect(process.env.MONGODB)
    .then(() => console.log("-- DB Connected --"))
    .catch((err) => console.log("-- DB Not Connected --", err.message));
};
