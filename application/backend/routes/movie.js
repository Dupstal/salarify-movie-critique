const MovieController = require("../controllers/movie");
const express = require("express");
const router = express.Router();

router.get("/", MovieController.getMovies);
router.get("/pages", MovieController.getNumberOfPages);

module.exports = router;
