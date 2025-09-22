const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://Rohit:ntthvRnf3yT61Q5U@namastenode.v7dudsp.mongodb.net/devTinder"
  );
};
module.exports = connectDB;
