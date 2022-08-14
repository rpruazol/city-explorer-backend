'use strict';


class Cache {
  constructor(data){
    this.movies = {
      data: null,
      created_at: null,
      cache_expiration: 30
    },
    this.weather = {
      data: null,
      created_at: null,
      cache_expiration: 1
    }
  }

  saveCache = (obj, city) => {
    this[obj].created_at = new Date();
    this[obj].searchQuery = city;
  }

  cacheCheck = ((obj, city) => {
    console.log('cacheCheck city ', city);
    // check if the created_at date is smaller than the cache_expiration date offset (e.g if weather data is less than 1 day old)
    return this[obj].data && this[obj].created_at.getUTCDate() <= this[obj].created_at.getUTCDate() + this[obj].cache_expiration && this[obj].searchQuery === city ? true : false
  })
}


module.exports = new Cache;