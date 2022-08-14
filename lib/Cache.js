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

  saveCache = (obj) => {
    this[obj].created_at = new Date();
  }

  cacheCheck = (obj => {
    // check if the created_at date is smaller than the cache_expiration date offset (e.g if weather data is less than 1 day old)
    return this[obj].data && this[obj].created_at.getUTCDate() <= this[obj].created_at.getUTCDate() + this[obj].cache_expiration ? true : false
  })
}


module.exports = new Cache;