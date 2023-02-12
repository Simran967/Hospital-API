const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");

// importing home routes
const homeRoutes = require('./routes/home_routes');

// importing body-parser
const bodyParser = require('body-parser');

// using middleware before handlers to parse request bodies in json format 
app.use(bodyParser.json());

// transferring incoming requests to home routes
app.use('/', homeRoutes);

// listening port number
app.listen(port, function (err) {
    if (err) {
      console.log(`Error in running the server : ${err}`);
      return;
    }
    console.log(`Server is up and running on port : ${port}`);
  });