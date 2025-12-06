module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Customer", {
        name: DataTypes.STRING,
        phoneNumber: DataTypes.STRING
    });
};