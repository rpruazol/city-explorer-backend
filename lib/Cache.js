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
    return this[obj].data && this[obj].created_at.getUTCDate() <= this[obj].created_at.getUTCDate() + this[obj].cache_expiration ? true : false
  })
}


module.exports = new Cache;