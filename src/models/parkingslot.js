'use strict';
module.exports = (sequelize, DataTypes) => {
  const ParkingSlot = sequelize.define(
    'ParkingSlot',
    {
      label: DataTypes.STRING,
      parkingLotId: DataTypes.INTEGER,
    },
    {}
  );
  ParkingSlot.associate = function (models) {
    ParkingSlot.belongsTo(models.ParkingLot, {
      foreignKey: 'parkingLotId',
      onDelete: 'CASCADE',
    });
    ParkingSLot.hasMany(models.Parking, {
      foreignKey: 'parkingSlotId',
    });
  };
  return ParkingSlot;
};
