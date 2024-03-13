const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Medication = sequelize.define('Medication', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Medication.associate = (models) => {
    Medication.belongsToMany(models.Pharmacy, { through: 'PharmacyMedication' });
  };

  Medication.associate = (models) => {
    Medication.hasMany(models.OrderItem);
  };


  return Medication;
};
