'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define(
    'Vehicle',
    {
      vehicle_number: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {}
  );
  Vehicle.associate = function (models) {
    Vehicle.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
    Vehicle.hasOne(models.Parking, {
      foreignKey: 'vehicleId',
    });
  };
  return Vehicle;
};
