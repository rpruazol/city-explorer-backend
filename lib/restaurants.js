'use strict';

const axios = require('axios');
require('dotenv').config();




function getRestaurants(req, res, next) {
  const URL = `https://api.yelp.com/v3/businesses/search?latitude=${req.query.latitude}&longitude=${req.query.longitude}&limit=5`

  console.log(URL)
  const auth = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`
    }
  }

  axios.get(URL, auth)
    .then(response => {
      const restaurantArray = response.data.businesses.map(restaurant => {
        return new Restaurant(restaurant)
      })
      res.send(restaurantArray)
    })

}


class Restaurant {
  constructor(obj){
    this.name = obj.name,
    this.image_url = obj.image_url,
    this.rating = obj.rating,
    this.category = obj.categories[0].alias
  }
}






module.exports = { getRestaurants }