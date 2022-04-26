const Parking = require('../models').Parking;

module.exports = {
  // Create
  create(req, res) {
    return Parking.findOne({
      where: {
        vehicleId: req.params.vehicleId,
        parkingSlotId: req.params.parkingSlotId,
      },
    })
      .then((parking) => {
        console.log('parking', parking);
        if (parking) {
          return res.status(400).send({
            message: 'Parking already exists',
          });
        }
        return Parking.create({
          vehicleId: req.params.vehicleId,
          parkingSlotId: req.params.parkingSlotId,
        })
          .then((parking) => res.status(201).send(parking))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
