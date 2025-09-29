const express = require("express");
const { userAuth } = require("../Middlewares/auth");

const profileRouter = express.Router();
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    //   const cookies = req.cookies;
    //   const { token } = cookies;
    //   if (!token) {
    //     throw new Error("Invalid Token");
    //   }

    //   // validate the token
    //   const decoddedMessage = await jwt.verify(token, "DEV@Tinder$45");

    //   const { _id } = decoddedMessage;
    //   console.log("Logged in user as: " + _id);
    //   const user = await User.findById(_id);
    //   if (!user) {
    //     throw new Error("User does not Exist");
    //   }
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
