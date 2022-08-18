'use strict';


const axios = require('axios');
const cors = require('cors');
const express = require('express');
const { getWeather } = require('./lib/weather.js')
const { getMovies } = require('./lib/movies.js')
const { getRestaurants } = require('./lib/restaurants.js')


require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('hello world');
});

app.get('/weather', getWeather);
app.get('/movies', getMovies);
app.get('/restaurants', getRestaurants);


app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error)
})

