'use strict'
const axios = require('axios');


async function getWeather(req, res, next) {
  try {
    const URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    console.log(URL)
    const result = await axios.get(URL)
    const forecastArray = result.data.data.map(obj => new Forecast(obj));
    res.status(200).send(forecastArray)
  } catch (error) {
    next(error.message)
  }
}


class Forecast {
  constructor(obj) {
    this.description = `Low of ${obj.min_temp}, High of ${obj.high_temp} with ${obj.weather.description}`;
    this.date = obj.valid_date;
  }
}


;

module.exports = { getWeather }