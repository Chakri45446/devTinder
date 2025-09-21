const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./Middlewares/auth");
// where middleware comes into picture

// Handle Auth Middleware for all GET,POST,... requests
app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
  res.send("User logged in successfully");
});

app.get("/user", userAuth, (req, res) => {
  res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All Data Sent");
});

// app.get("/user/:id/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Chandu", lastName: "Seelam" });
// });

app.listen(4555, () => {
  console.log("Server is Successfully listening on port 4555...");
});
