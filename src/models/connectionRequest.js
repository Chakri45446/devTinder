const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "intersted", "accepted", "rejected"],
        message: `{$VALUE} is incorrect status type `,
      },
    },
  },
  { timestamps: true }
);
requestSchema.index({ fromUserId: 1, toUserId: 1 });
requestSchema.pre("save", function (next) {
  const connectionRequest = this;

  //check if the fromUserId is same as toUserId
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("Cannot send the connection request to yourself");
  }
  next();
});

const connectionRequest = new mongoose.model(
  "connectionRequest",
  requestSchema
);

module.exports = connectionRequest;
