const { Customer, Restaurant } = require('../models');

module.exports = {
    createCustomer: async (req, res) => {
        try {
            const customer = await Customer.create(req.body);
            res.json(customer);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    },

    listCustomers: async (req, res) => {
        const customers = await Customer.findAll({ include: Restaurant });
        res.json(customers);
    },

    getCustomer: async (req, res) => {
        const customer = await Customer.findByPk(req.params.id, { include: Restaurant });
        res.json(customer);
    }
};
