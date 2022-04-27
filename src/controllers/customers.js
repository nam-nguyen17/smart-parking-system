const Customer = require('../models').Customer;
const Vehicle = require('../models').Vehicle;

module.exports = {
  // Create
  create(req, res) {
    if (!req.body.name || req.body.name === '') {
      return res.status(400).send({ message: 'Name required' });
    }
    if (!req.body.phone_number || req.body.phone_number === '') {
      return res.status(400).send({ message: 'Phone number required' });
    }
    return Customer.findOne({
      where: {
        phone_number: req.body.phone_number,
      },
    })
      .then((customer) => {
        if (customer) {
          return res.status(409).send({
            message: 'Customer record with this phone number already exists ',
          });
        } else {
          Customer.create({
            name: req.body.name,
            phone_number: req.body.phone_number,
          }).then((customer) => res.status(201).send(customer));
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  // List all
  list(req, res) {
    return Customer.findAll()
      .then((customer) => res.status(200).send(customer))
      .catch((error) => res.status(400).send(error));
  },

  // Retrieve
  retrieve(req, res) {
    return Customer.findByPk(req.params.customerId, {
      include: [
        {
          model: Vehicle,
        },
      ],
    })
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return res.status(200).send(customer);
      })
      .catch((error) => res.status(400).send(error));
  },

  // Update
  update(req, res) {
    return Customer.findOne({
      where: {
        phone_number: req.body.phone_number,
      },
    })
      .then((customer) => {
        if (customer) {
          return res.status(409).send({
            message: 'Phone record already exists, try another slot ',
          });
        } else {
          return Customer.findById(req.params.customerId, {
            include: [
              {
                model: Vehicle,
              },
            ],
          })
            .then((customer) => {
              if (!customer) {
                return res.status(404).send({
                  message: 'Customer Not Found',
                });
              }
              return customer
                .update(req.body, { fields: Object.keys(req.body) })
                .then(() => res.status(200).send(customer))
                .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
        }
      })
      .catch((error) => res.status(400).send(error));
  },

  // Delete
  destroy(req, res) {
    return Customer.findByPk(req.params.customerId)
      .then((customer) => {
        if (!customer) {
          return res.status(404).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .destroy()
          .then(() => res.status(204).send({ message: 'Message deleted' }))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
