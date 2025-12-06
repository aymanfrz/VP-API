const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false
});

const Customer = require('./customer')(sequelize, DataTypes);
const Restaurant = require('./restaurant')(sequelize, DataTypes);
const Order = require('./order')(sequelize, DataTypes);
const CustomerRestaurant = require('./customerRestaurant')(sequelize, DataTypes);

// relations tabel
Customer.belongsToMany(Restaurant, { through: CustomerRestaurant, foreignKey: 'customerId' });
Restaurant.belongsToMany(Customer, { through: CustomerRestaurant, foreignKey: 'restaurantId' });

Customer.hasMany(Order, { foreignKey: 'customerId' });
Order.belongsTo(Customer, { foreignKey: 'customerId' });

Restaurant.hasMany(Order, { foreignKey: 'restaurantId' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId' });

// seed
async function seed() {
  const c1 = await Customer.create({ name: "Alice", phoneNumber: "0812340001" });
  const c2 = await Customer.create({ name: "Bob", phoneNumber: "0812340002" });
  const c3 = await Customer.create({ name: "Charlie", phoneNumber: "0812340003" });

  const r1 = await Restaurant.create({ name: "Warung R1", description: "Nasi goreng", isOpen: true });
  const r2 = await Restaurant.create({ name: "Sushi R2", description: "Japanese food", isOpen: false });
  const r3 = await Restaurant.create({ name: "Pizza R3", description: "Italian food", isOpen: true });

  await c1.addRestaurant(r1);
  await c1.addRestaurant(r2);
  await c2.addRestaurant(r1);
  await c3.addRestaurant(r3);

  const createOrder = async ({ customer, restaurant, items }) => {
    const minutes = items * 10 + 10;
    const estimatedArrival = new Date(Date.now() + minutes * 60 * 1000);

    return Order.create({
      customerId: customer.id,
      restaurantId: restaurant.id,
      items,
      estimatedArrival
    });
  };

  await createOrder({ customer: c1, restaurant: r1, items: 1 });
  await createOrder({ customer: c1, restaurant: r2, items: 2 });
  await createOrder({ customer: c2, restaurant: r1, items: 3 });
  await createOrder({ customer: c3, restaurant: r3, items: 1 });
  await createOrder({ customer: c2, restaurant: r3, items: 4 });

  console.log("Dummy data created");
}

module.exports = {
  sequelize,
  Customer,
  Restaurant,
  Order,
  CustomerRestaurant,
  seed
};
