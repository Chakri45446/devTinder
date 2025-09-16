const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello From Rohit");
});

app.get("/works", (req, res) => {
  res.send("It's Working");
});

app.listen(4555, () => {
  console.log("Server is Successfully listening on port 4555...");
});
