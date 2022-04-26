'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParkingLot = sequelize.define(
    'ParkingLot',
    {
      parking_slot_id: DataTypes.INTEGER,
    },
    {}
  );
  ParkingLot.associate = function (models) {
    ParkingLot.hasMany(models.ParkingSlot, {
      foreignKey: 'parkingLotId',
    });
  };
  return ParkingLot;
};
