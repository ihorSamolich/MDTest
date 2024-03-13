const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const OrderData = sequelize.define('OrderData', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    OrderData.associate = (models) => {
        OrderData.hasMany(models.OrderItem);
    };

    return OrderData;
};
