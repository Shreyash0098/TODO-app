const express = require("express");
const mongoose = require("mongoose");

const allRoutes = require("../backend/routes/indexRoute");

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

app.use(allRoutes);

mongoose
  .connect(
    "mongodb+srv://shreyashp:3I0vjF9GWjX5gRku@cluster0.lbknvrv.mongodb.net/todo"
  )
  .then((result) => {
    app.listen(8000);
    console.log("Ready to rock");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
