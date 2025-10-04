const express = require("express");
const { userAuth } = require("../Middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age about skills";

// Get all the Pending Connection request for the logged In User
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        toUserId: loggedInUser._id,
        status: "intersted",
      })
      .populate("fromUserId", USER_SAFE_DATA);
    res.json({
      message: "Data Successfully Fetched",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .select(USER_SAFE_DATA);
    res.send(users);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = userRouter;
