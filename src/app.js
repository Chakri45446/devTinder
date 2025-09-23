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
