const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, seed } = require('./models');

const customersRouter = require('./routes/customers');
const restaurantsRouter = require('./routes/restaurants');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(bodyParser.json());

// routes yang digunakan
app.use('/customers', customersRouter);
app.use('/restaurants', restaurantsRouter);
app.use('/orders', ordersRouter);

const PORT = 3000;

async function start() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    await seed();
    console.log("Seed complete");

    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
}

start();
