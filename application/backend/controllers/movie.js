const fs = require('fs');

let tempData = fs.readFileSync('../../data/data.json');
let movies = JSON.parse(tempData);

exports.getMovies = async (req, res, next) => {
  try {
    let page = +req.query.page;
    if (!page) {
      page = 0;
    }

    const moviesToReturn = movies.slice(page * 6, (page + 1) * 6);

    return res.status(200).json(moviesToReturn);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}

exports.getNumberOfPages = async (req, res, next) => {
  try {
    const numberOfPages = Math.ceil(movies.length / 6);
    return res.status(200).json(numberOfPages);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
}