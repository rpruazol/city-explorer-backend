'use strict'
const axios = require('axios');
const Cache = require('./Cache.js');

async function getWeather(req, res, next) {

  if (Cache.cacheCheck('weather')) {
    console.log('cache hit');

    res.status(200).send(Cache.weather.data);
  } else {
    try {
      const URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
      console.log(URL)
      const result = await axios.get(URL)
      const forecastArray = result.data.data.map(obj => new Forecast(obj));

      Cache.weather.data = forecastArray;
      Cache.saveCache('weather');
      console.log(Cache.weather.created_at);
      console.log('cache miss, saved to cache');
      console.log(Cache.weather);

      res.status(200).send(forecastArray)

    } catch (error) {
      next(error.message)
    }

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