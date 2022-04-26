'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      name: DataTypes.STRING,
      phone_number: DataTypes.INTEGER,
    },
    {}
  );
  Customer.associate = (models) => {
    Customer.hasOne(models.Vehicle, {
      foreignKey: 'customerId',
    });
  };
  return Customer;
};
