const { Order, Customer, Restaurant } = require('../models');

module.exports = {
    listOrders: async (req, res) => {
        const orders = await Order.findAll({ include: [Customer, Restaurant] });
        res.json(orders);
    }
};
