const express = require("express");
const bodyParser = require("body-parser");
const useragent = require("express-useragent");
const movieRoutes = require("./routes/movie");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(useragent.express());

var cors = require('cors')

app.use(cors())

app.use("/api/movie", movieRoutes);

module.exports = app;
