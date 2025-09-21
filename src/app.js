const express = require("express");

const app = express();
// app.use("/route" , rH , [rH1 , rH2] , rH3 , rH4 , rH5) // works like same as below (no difference)
app.use(
  "/user",
  (req, res, next) => {
    // Route Handler
    console.log("Handling the Route user!");
    //res.send("Response!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route user 2!");
    //res.send("2nd Response!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route user 3!");
    //res.send("3rd Response!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route user 4!");
    //res.send("4th Response!");
    next();
  },
  (req, res, next) => {
    console.log("Handling the Route user 5!");
    res.send("5th Response!");
  }
);

// app.get("/user/:id/:name/:password", (req, res) => {
//   console.log(req.params);
//   res.send({ firstName: "Chandu", lastName: "Seelam" });
// });

app.listen(4555, () => {
  console.log("Server is Successfully listening on port 4555...");
});
