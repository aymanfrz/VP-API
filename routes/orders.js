const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');

router.get('/', controller.listOrders);

module.exports = router;