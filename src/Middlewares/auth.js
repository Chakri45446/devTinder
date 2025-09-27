const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    //Read the token
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    // validate the token
    const decoddedObj = await jwt.verify(token, "DEV@Tinder$45");

    const { _id } = decoddedObj;

    // find the user

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User does not Exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

module.exports = {
  userAuth,
};
