module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Order", {
        items: DataTypes.INTEGER,
        estimatedArrival: DataTypes.DATE
    });
};