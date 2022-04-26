const Parking = require('../models').Parking;
const Vehicle = require('../models').Vehicle;
const ParkingSlot = require('../models').ParkingSlot;

module.exports = {
  // Create
  create(req, res) {
    return Parking.findOne({
      where: {
        $or: [
          { vehicleId: req.body.vehicleId },
          { parkingSlotId: req.body.parkingSlotId },
        ],
      },
    })
      .then((parking) => {
        if (parking) {
          return res.status(400).send({
            message: 'Parking already exists',
          });
        }
        return Parking.create({
          parkingSlotId: req.body.parkingSlotId,
          vehicleId: req.body.vehicleId,
        })
          .then((parking) => res.status(201).send(parking))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  list(req, res) {
    return Parking.all()
      .then((parking) => res.status(200).send(parking))
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Parking.findById(req.params.parkingId, {
      include: [
        {
          model: Vehicle,
        },
      ],
    })
      .then((parking) => {
        if (!parking) {
          return res.status(404).send({
            message: 'Parking Record Not Found',
          });
        }
        return res.status(200).send(parking);
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Parking.find({
      where: {
        parkingSlotId: req.body.parkingSlotId,
        vehicleId: req.body.vehicleId,
      },
    })
      .then((parking) => {
        if (!parking) {
          return res.status(404).send({
            message: 'Record not found',
          });
        }

        return parking
          .destroy()
          .then(() =>
            res.status(204).send({
              message: 'Parking Record Removed',
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
