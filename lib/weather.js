'use strict'
const axios = require('axios');
const Cache = require('./Cache.js');

async function getWeather(req, res, next) {
console.log('weather search query ', req.query)
  if (Cache.cacheCheck('weather', req.query.searchQuery)) {
    console.log('weather cache hit');
    res.status(200).send({'forecastArray': Cache.weather.data, 'created_at': Cache.weather.created_at});
  } else {
    try {
      const URL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
      console.log(URL)
      const result = await axios.get(URL)
      const forecastArray = result.data.data.map(obj => new Forecast(obj));

      Cache.weather.data = forecastArray;
      Cache.saveCache('weather', req.query.searchQuery);
      console.log('cache miss, weather saved to cache');

      res.status(200).send({'forecastArray': forecastArray, 'created_at': Cache.weather.created_at})

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