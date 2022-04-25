const MovieController = require("../controllers/movie");
const express = require("express");
const router = express.Router();

router.get("/", MovieController.getMovies);
router.get("/pages", MovieController.getNumberOfPages);
router.get("/:id", MovieController.getMovie);
router.post("/", MovieController.addMovie);
router.delete("/:id", MovieController.deleteMovie);
router.put("/:id", MovieController.updateMovie);

module.exports = router;
