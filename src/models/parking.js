'use strict';
module.exports = (sequelize, DataTypes) => {
  const Parking = sequelize.define(
    'Parking',
    {
      parkingSlotId: DataTypes.INTEGER,
      vehicleId: DataTypes.INTEGER,
    },
    {}
  );
  Parking.associate = (models) => {
    Parking.belongsTo(models.ParkingSlot, {
      foreignKey: 'parkingSlotId',
      onDelete: 'CASCADE',
    });
    Parking.belongsTo(models.Vehicle, {
      foreignKey: 'vehicleId',
      onDelete: 'CASCADE',
    });
  };
  return Parking;
};
