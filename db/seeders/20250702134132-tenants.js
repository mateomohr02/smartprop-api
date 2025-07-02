'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Tenants", [
    { 
      id: '2fcee51c-7879-4682-92c2-033e72fe129f',
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
