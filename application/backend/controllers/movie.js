const fs = require('fs');

let tempData = fs.readFileSync('../../data/data.json');
let movies = JSON.parse(tempData);

exports.getMovies = async (req, res, next) => {
  try {
    let moviesToReturn = [];

    let searchTerm = req.query.searchTerm;
    if (searchTerm && searchTerm != '') {
      moviesToReturn = movies.filter(movie => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      moviesToReturn = movies;
    }

    let page = +req.query.page;
    if (!page) {
      page = 0;
    }
    moviesToReturn = moviesToReturn.slice(page * 6, (page + 1) * 6);
    
    return res.status(200).json(moviesToReturn);
    
  } catch (error) {
    return res.status(500).send();
  }
}

exports.getMovie = async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (!id) {
      return res.status(400).send();
    }
  
    let fetchedMovie = movies.find(movie => movie.id === id);
    if (!fetchedMovie) {
      return res.status(404).send();
    } else {
      return res.status(200).json(fetchedMovie);
    }
  } catch (error) {
    return res.status(400).send();  
  }
}

exports.addMovie = async (req, res, next) => {
  try {

    if (!req.body.name || !req.body.year || !req.body.director || !req.body.stars || !req.body.writers || !req.body.imgUrl || !req.body.review || !req.body.directing || !req.body.acting || !req.body.costumeDesign || !req.body.editing || !req.body.music || !req.body.visualEffects || !req.body.screenplay) {
      return res.status(400).send();
    }

    const movie = {
      id: movies.length + 1,
      name: req.body.name,
      year: req.body.year,
      director: req.body.director,
      stars: req.body.stars,
      writers: req.body.writers,
      imgUrl: req.body.imgUrl,
      review: req.body.review,
      ratings: {
        directing: req.body.directing,
        acting: req.body.acting,
        costumeDesign: req.body.costumeDesign,
        editing: req.body.editing,
        music: req.body.music,
        visualEffects: req.body.visualEffects,
        screenplay: req.body.screenplay
      }
    };

    movies.push(movie);
    // fs.writeFileSync('../../data/data.json', JSON.stringify(movies));
    
    return res.status(201).send();
  } catch (error) {
    return res.status(500).send();
  }
};

exports.updateMovie = async (req, res, next) => {
  try {

    if (!req.body.name || !req.body.year || !req.body.director || !req.body.stars || !req.body.writers || !req.body.imgUrl || !req.body.review || !req.body.directing || !req.body.acting || !req.body.costumeDesign || !req.body.editing || !req.body.music || !req.body.visualEffects || !req.body.screenplay) {
      return res.status(400).send();
    }
    
    const id = +req.params.id;
    if (!id) {
      return res.status(400).send();
    }

    const updatedMovie = {
      id: movies.length + 1,
      name: req.body.name,
      year: req.body.year,
      director: req.body.director,
      stars: req.body.stars,
      writers: req.body.writers,
      imgUrl: req.body.imgUrl,
      review: req.body.review,
      ratings: {
        directing: req.body.directing,
        acting: req.body.acting,
        costumeDesign: req.body.costumeDesign,
        editing: req.body.editing,
        music: req.body.music,
        visualEffects: req.body.visualEffects,
        screenplay: req.body.screenplay
      }
    };

    movies = movies.map(movie => movie.id === id ? updatedMovie : movie);
    // fs.writeFileSync('../../data/data.json', JSON.stringify(movies));
    return res.status(200).send();

  } catch (error) {
    return res.status(500).send();
  }
}

exports.deleteMovie = async (req, res, next) => {
  try {
    const id = +req.params.id;
    if (!id) {
      return res.status(400).send();
    }

    movies = movies.filter(movie => movie.id !== id);

    return res.status(204).json(true);
  } catch (error) {
    return res.status(500).send();
  }
};

exports.getNumberOfPages = async (req, res, next) => {
  try {
    const numberOfPages = Math.ceil(movies.length / 6);
    return res.status(200).json(numberOfPages);
  } catch (error) {
    return res.status(500).send();
  }
}