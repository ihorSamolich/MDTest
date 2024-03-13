const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const OrderItem = sequelize.define('OrderItem', {
        count: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    OrderItem.associate = (models) => {
        OrderItem.belongsTo(models.Medication);
    };

    return OrderItem;
};