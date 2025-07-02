'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
    { 
      id: uuidv4(),
      email:"mohr.mateo@gmail.com",
      name:"Mateo Mohr",
      password: "Mateo2002+",
      isValidated:true,
      tenantId:'2fcee51c-7879-4682-92c2-033e72fe129f',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: uuidv4(),
      email:"mohr.mateo1@gmail.com",
      name:"Mateo Mohr 1",
      password: "Mateo2002+",
      isValidated: false,
      tenantId:'2fcee51c-7879-4682-92c2-033e72fe129f',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: uuidv4(),
      email:"mohr.mateo2@gmail.com",
      name:"Mateo Mohr 2",
      password: "Mateo2002+",
      isValidated: true,
      tenantId:'70c5a92d-4f44-412d-ae80-82d5fb262815',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   { 
      id: uuidv4(),
      email:"mohr.mateo3@gmail.com",
      name:"Mateo Mohr 3",
      password: "Mateo2002+",
      isValidated: false,
      tenantId:'70c5a92d-4f44-412d-ae80-82d5fb262815',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ]);
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', {
      email: ['mohr.mateo@gmail.com', 'mohr.mateo1@gmail.com', 'mohr.mateo2@gmail.com', 'mohr.mateo3@gmail.com']
    });
  }
};
