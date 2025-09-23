const mongoose = require("mongoose");
const { MONGOOSE_CONNECT } = require("../../utils/constants");

const connectDB = async () => {
  await mongoose.connect(MONGOOSE_CONNECT);
};
module.exports = connectDB;
