const mongoose = require("mongoose");

const url = process.env.MONGOOSE_API;

//asynchronous - return Promise
mongoose
  .connect(url)
  .then((result) => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
