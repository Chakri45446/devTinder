const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added to Database Successfully");
  } catch (err) {
    res.status(400).send("Eroor saving to user:" + err.message);
  }
});

//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  // try {
  //   const user = await User.findOne({ emailId: userEmail });
  //   if (!user) {
  //     res.status(404).send("user not found");
  //   } else {
  //     res.send(user);
  //   }
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("users not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(4500, () => {
      console.log("Server is Successfully listening on port 4500...");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected");
  });
