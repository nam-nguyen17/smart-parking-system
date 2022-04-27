const Parking = require('../models').Parking;
const Vehicle = require('../models').Vehicle;
const ParkingSlot = require('../models').ParkingSlot;

module.exports = {
  // Create
  create(req, res) {
    if (!req.body.vehicleId || req.body.vehicleId === '') {
      return res.status(400).send({ message: 'Vehicle Id required' });
    }
    if (
      !req.body.parkingSlotId ||
      req.body.parkingSlotId === '' ||
      req.body.parkingSlotId > 10
    ) {
      // condition assumes there are 10 slots, because of the amount seeded
      return res
        .status(400)
        .send({ message: "You can't park without a parking slot!" });
    }
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
          return res.status(409).send({
            message: 'Parking record already exists, try another slot',
          });
        } else {
          Parking.create({
            parkingSlotId: req.body.parkingSlotId,
            vehicleId: req.body.vehicleId,
          }).then((parking) => res.status(201).send(parking));
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  // List all
  list(req, res) {
    return Parking.all()
      .then((parking) => res.status(200).send(parking))
      .catch((error) => res.status(400).send(error));
  },

  // Retrieve
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

  // Delete
  destroy(req, res) {
    if (!req.body.parkingSlotId || req.body.parkingSlotId === '') {
      return res.status(400).send({ message: 'Parking slot id required' });
    }
    if (!req.body.vehicleId || req.body.vehicleId === '') {
      return res.status(400).send({ message: 'Vehicle Id required' });
    }

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
