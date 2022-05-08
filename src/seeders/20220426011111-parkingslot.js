'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ParkingSlots', [
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        parkingLotID: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
