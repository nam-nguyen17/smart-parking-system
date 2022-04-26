const Vehicle = require('../models').Vehicle;
const Customer = require('../models').Customer;

module.exports = {
  create(req, res) {
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

  update(req, res) {
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
  },

  list(req, res) {
    return Vehicle.findAll({
      where: {
        customerId: req.params.customerId,
      },
    })
      .then((vehicle) => res.status(200).send(vehicle))
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Vehicle.findById(req.params.vehicleId, {
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
