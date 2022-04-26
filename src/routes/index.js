const customersController = require('../controllers').customers;
const vehiclesController = require('../controllers').vehicles;
const parkingsController = require('../controllers').parkings;

module.exports = (app) => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the customers API!',
    })
  );

  //cutomers
  app.post('/api/customers', customersController.create);
  app.get('/api/customers', customersController.list);
  app.get('/api/customers/:customerId', customersController.retrieve);
  app.put('/api/customers/:customerId', customersController.update);
  app.delete('/api/customers/:customerId', customersController.destroy);

  //vehicles
  app.post('/api/customers/:customerId/vehicle', vehiclesController.create);
  app.get('/api/vehicles', vehiclesController.list);
  app.get('/api/vehicles/:vehicleId', vehiclesController.retrieve);
  app.put(
    '/api/customers/:customerId/vehicle/:vehicleId',
    vehiclesController.update
  );
  app.delete(
    '/api/customers/:customerId/vehicle/:vehicleId',
    vehiclesController.destroy
  );

  //parking
  app.post('/api/parking', parkingsController.create);
  app.delete('/api/parking', parkingsController.destroy);
  app.get('/api/parking', parkingsController.list);
  app.get('/api/parking/:parkingId', parkingsController.retrieve);
};
