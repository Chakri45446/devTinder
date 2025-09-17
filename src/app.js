const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Chandu", lastName: "Seelam" });
});

app.post("/user", (req, res) => {
  // Saving data to DB
  res.send("Data Successfully saved to the database!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully!");
});

// this will match all the HTTP method API calls to /works
app.use("/works", (req, res) => {
  res.send("It's Working");
});

app.listen(4555, () => {
  console.log("Server is Successfully listening on port 4555...");
});
