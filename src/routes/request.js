const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();
requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.userId;
      const status = req.params.status;

      const isAllowedStatus = ["ignored", "intersted"];
      if (!isAllowedStatus.includes(status)) {
        return res
          .status(404)
          .json({ message: "Invalid Status:" + " " + status });
      }

      // If there is any existing connectionRequest
      const existingConnectionRequest = await connectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(404)
          .json({ message: "Connection Request Already Exists" });
      }

      // if user Id exists in DB or not
      const isUserIdExists = await User.findById(toUserId);
      if (!isUserIdExists) {
        res.status(404).json({ message: "User Not Found!" });
      }

      const connectionRequestUser = new connectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequestUser.save();
      res.send({
        message:
          req.user.firstName +
          " is " +
          status +
          " in " +
          isUserIdExists.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;
