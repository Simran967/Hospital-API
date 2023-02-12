require("dotenv").config();
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
mongoose.connect(`${process.env.MONGO_URL}`, () => {
  console.log("Connected to MongoDB");
});