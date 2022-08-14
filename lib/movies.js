'use strict';

const axios = require('axios');
const Cache = require('./Cache.js');

async function getMovies(req, res, next){
  if(Cache.cacheCheck('movies')) {
    console.log('cache hit');
    res.status(200).send(Cache.movies.data);
  } else {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${req.query.searchQuery}&page=1`
    const response = await axios.get(URL)
    const movieArray = response.data.results.map(obj => new Movie(obj))
    
    Cache.movies.data = movieArray;
    Cache.saveCache('movies')
    console.log('cache miss, saving to cache');
    console.log(Cache.movies.created_at);

    res.status(200).send(movieArray)
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