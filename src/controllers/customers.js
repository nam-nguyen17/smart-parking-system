const Customer = require('../models').Customer;
const Vehicle = require('../models').Vehicle;

module.exports = {
  // Create
  create(req, res) {
    console.log('req', req);
    return Customer.create({
      name: req.body.name,
      phone_number: req.body.phone_number,
    })
      .then((customer) => res.status(201).send(customer))
      .catch((error) => res.status(400).send(error));
  },

  // List
  list(req, res) {
    return Customer.all()
      .then((customers) => res.status(200).send(customers))
      .catch((error) => res.status(400).send(error));
  },

  // Retrieve
  retrieve(req, res) {
    return Customer.findById(req.params.customerId, {
      include: [
        {
          model: Vehicle,
          as: 'vehicles',
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
    return Customer.findById(req.params.customerId, {
      include: [
        {
          model: Vehicle,
          as: 'vehicles',
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
          .then(() => res.status(200).send(customer)) // Send back the updated customer.
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  // Delete
  destroy(req, res) {
    return Customer.findById(req.params.customerId)
      .then((customer) => {
        if (!customer) {
          return res.status(400).send({
            message: 'Customer Not Found',
          });
        }
        return customer
          .destroy()
          .then(() =>
            res.status(204).send({ message: 'Customer deleted successfully.' })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
