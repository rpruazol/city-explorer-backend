'use strict';


const axios = require('axios');
const cors = require('cors');
const express = require('express');
const {getWeather} = require('./lib/weather.js')

require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/weather', getWeather);
app.get('/movies', (req, res, next) => getMovies(req.query, res, next))


app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})


async function getMovies(req, res, next){
  const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${req.searchQuery}&page=1`

  const response = await axios.get(URL)
  
  const movieArray = response.data.results.map(obj => new Movie(obj))
  console.log(response.data.results)
  console.log(movieArray)
  res.status(200).send(movieArray)
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

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error)
})