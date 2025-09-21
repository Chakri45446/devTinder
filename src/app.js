const express = require("express");

const app = express();

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something Went Wrong");
//   }
// });

app.get("/getUserData", (req, res) => {
  try {
    // logic of DB call and get user Data
    throw new Error("njfbwhhjw");
    res.send("User Data Sent");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something Went Wrong");
//   }
// });

// app.get("/user/:id/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Chandu", lastName: "Seelam" });
// });

app.listen(4555, () => {
  console.log("Server is Successfully listening on port 4555...");
});
