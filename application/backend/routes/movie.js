const MovieController = require("../controllers/movie");
const express = require("express");
const router = express.Router();

router.get("/", MovieController.getMovies);

module.exports = router;
