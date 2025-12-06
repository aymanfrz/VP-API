module.exports = (sequelize, DataTypes) => {
    return sequelize.define("CustomerRestaurant", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    });
};
