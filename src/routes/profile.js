const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const bcrypt = require("bcrypt");
const {
  valiadteEditProfileData,
  validateForgotPassword,
} = require("../../utils/validation");

const profileRouter = express.Router();
profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!valiadteEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user; // comes with userAuth

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile Updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("EROOR: " + err.message);
  }
});

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    if (!validateForgotPassword(req)) {
      throw new Error("Invalid Password Request");
    }
    const user = req.user;

    const { password } = req.body;

    const isSame = await bcrypt.compare(password, user.password);

    if (isSame) {
      throw new Error("New password must be different from old password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.send("Password successfully updated");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
