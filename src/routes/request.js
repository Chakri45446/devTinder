const express = require("express");
const { userAuth } = require("../Middlewares/auth");

const requestRouter = express.Router();
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending a connection Request");

  res.send(user.firstName + ", " + "sent a connection request");
});

module.exports = requestRouter;
