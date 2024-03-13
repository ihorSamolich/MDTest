const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pharmacy = sequelize.define('Pharmacy', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Pharmacy.associate = (models) => {
    Pharmacy.belongsToMany(models.Medication, { through: 'PharmacyMedication' });
  };
  return Pharmacy;
};
