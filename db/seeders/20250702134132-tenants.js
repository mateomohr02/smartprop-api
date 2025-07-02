'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tenants", [
    { 
      id: '2b9db4e2-b729-4de1-aef5-a6cfcc391cb0',
      name: "Inmobiliaria Mohr",
      email: "inmomohr@gmail.com",
      domain: "inmomohr.com.ar",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '70c5a92d-4f44-412d-ae80-82d5fb262815',
      name: "Inmobiliaria Muestra",
      email: "inmomuestra@gmail.com",
      domain: "inmomuestra.com.ar",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tenants', {
      email: ['inmomohr@gmail.com', 'inmomuestra@gmail.com'],
    });
  }
};
