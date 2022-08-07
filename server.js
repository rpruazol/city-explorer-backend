'use strict';


const axios = require('axios');
const cors = require('cors');
const express = require('express');
const weatherData = require('./data/weather.json');


require('dotenv').config();

const app = express()
const PORT = process.env.PORT || 3002

app.use(cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/weather', (req, res, next) => getWeather(req.query, res, next))

app.listen(PORT, () => {
  console.log('now listening on port ', PORT)
})


async function getWeather(req, res, next) {

  try {
    const cityObject = weatherData.find(object => object.city_name.toLowerCase() === req.searchQuery.toLowerCase())
    const forecastArray = cityObject.data.map(obj => new Forecast(obj));
    res.status(200).send(forecastArray)
  } catch (error) {
    next(error.message)
  }
}


class Forecast {
  constructor(obj) {
    this.date = obj.valid_date;
    this.description = obj.weather.description;
  }
}

app.use((error, request, response, next) => {
  console.log(error);
  response.status(500).send(error)
})