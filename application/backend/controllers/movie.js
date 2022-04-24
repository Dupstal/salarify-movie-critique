const fs = require('fs');

let tempData = fs.readFileSync('../../data/data.json');
let movies = JSON.parse(tempData);

exports.getMovies = async (req, res, next) => {
  try {
    return res.status(200).json(movies);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}