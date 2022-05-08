const Vehicle = require('../models').Vehicle;
const Customer = require('../models').Customer;

module.exports = {
  // Create
  create(req, res) {
    if (!req.body.vehicle_number || req.body.vehicle_number === '') {
      return res.status(400).send({ message: 'Vehicle License required' });
    }
    return Vehicle.findOne({
      where: {
        vehicle_number: req.body.vehicle_number,
        customerId: req.params.customerId,
      },
    })
      .then((vehicle) => {
        if (vehicle) {
          return res.status(409).send({
            message: 'Vehicle record already exists ',
          });
        } else {
          Vehicle.create({
            vehicle_number: req.body.vehicle_number,
            customerId: req.params.customerId,
          }).then((vehicle) => res.status(201).send(vehicle));
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  // Update
  update(req, res) {
    return Vehicle.findOne({
      where: {
        vehicle_number: req.body.vehicle_number,
      },
    })
      .then((vehicle) => {
        if (vehicle) {
          return res.status(409).send({
            message: 'Vehicle Licence is already in our system ',
          });
        } else {
          return Vehicle.find({
            where: {
              id: req.params.vehicleId,
              customerId: req.params.customerId,
            },
          })
            .then((vehicle) => {
              if (!vehicle) {
                return res.status(404).send({
                  message: 'Vehicle Not Found',
                });
              }
              return vehicle
                .update(req.body, { fields: Object.keys(req.body) })
                .then((updatedVehicle) => res.status(200).send(updatedVehicle))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  // List all
  list(req, res) {
    return Vehicle.findAll()
      .then((vehicle) => res.status(200).send(vehicle))
      .catch((error) => res.status(400).send(error));
  },

  // Retrieve
  retrieve(req, res) {
    return Vehicle.findByPk(req.params.vehicleId, {
      include: [
        {
          model: Customer,
        },
      ],
    })
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).send({
            message: 'Vehicle Not Found',
          });
        }
        return res.status(200).send(vehicle);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Delete
  destroy(req, res) {
    return Vehicle.find({
      where: {
        id: req.params.vehicleId,
        customerId: req.params.customerId,
      },
    })
      .then((vehicle) => {
        if (!vehicle) {
          return res.status(404).send({
            message: 'Vehicle Not Found',
          });
        }

        return vehicle
          .destroy()
          .then(() =>
            res.status(204).send({
              message: 'Vehicle Record Removed',
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
