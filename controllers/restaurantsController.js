const { Restaurant } = require('../models');

module.exports = {
    createRestaurant: async (req, res) => {
        const restaurant = await Restaurant.create(req.body);
        res.json(restaurant);
    },

    listRestaurants: async (req, res) => {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    }
};
