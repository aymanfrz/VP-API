const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurantsController');

router.get('/', controller.listRestaurants);
router.post('/', controller.createRestaurant);

module.exports = router;