'use strict';

// TODO 8/14:  STRETCH GOAL TO RENDER CREATED_AT.  REFER TO weather.js FOR MORE

const axios = require('axios');
const Cache = require('./Cache.js');

async function getMovies(req, res, next){
  if(Cache.cacheCheck('movies', req.query.searchQuery)) {
    console.log('movies cache hit');
  
    res.status(200).send({'movieArray': Cache.movies.data, 'created_at': Cache.movies.created_at});
  } else {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${req.query.searchQuery}&page=1`
    const response = await axios.get(URL)
    const movieArray = response.data.results.map(obj => new Movie(obj))
    
    Cache.movies.data = movieArray;
    Cache.saveCache('movies', req.query.searchQuery)
    console.log('cache miss, movies saved to cache');
    // console.log(Cache.movies);

    res.status(200).send({'movieArray': movieArray, 'created_at': Cache.movies.created_at})
  }


}

class Movie {
  constructor(obj){
    this.title = obj.original_title
    this.overview = obj.overview
    this.average_votes = obj.vote_average
    this.image_url = obj.poster_path
    this.popularity = obj.popularity
    this.released_on = obj.release_date
  }
}




module.exports = {getMovies}