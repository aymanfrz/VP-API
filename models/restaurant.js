module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Restaurant", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        isOpen: DataTypes.BOOLEAN
    });
};
