const express = require('express');
const router = express.Router();
const controller = require('../controllers/customersController');

router.get('/', controller.listCustomers);
router.get('/:id', controller.getCustomer);
router.post('/', controller.createCustomer);

module.exports = router;