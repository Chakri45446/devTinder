const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./Middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the Password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User added to Database Successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

// post login
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordvalid = await bcrypt.compare(password, user.password);
    if (isPasswordvalid) {
      // Create a JWT Token
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$45", {
        expiresIn: "7d",
      });

      // Add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  const user = req.user;
  console.log("Sending a connection Request");

  res.send(user.firstName + " " + "Sent a connection Request");
});

app.get("/profile", userAuth, async (req, res) => {
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
