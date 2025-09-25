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

// delete a user using userId from the database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    //const user = await User.findByIdAndDelete(userId);
    const user = await User.findByIdAndDelete({ _id: userId });

    res.send("User deleted Successfully!");
  } catch (err) {
    res.send(400).send("Something went wrong");
  }
});

//Update data of the  user
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  //console.log(data);
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isAllowedUpdate = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isAllowedUpdate) {
      throw new Error("Updates are not Allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can not be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
      runValidators: true,
    });
    //console.log(user);
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("Update Failed:" + err.message);
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
