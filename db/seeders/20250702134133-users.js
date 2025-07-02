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
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated:true,
      tenantId:'2b9db4e2-b729-4de1-aef5-a6cfcc391cb0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: uuidv4(),
      email:"mohr.mateo1@gmail.com",
      name:"Mateo Mohr 1",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated: false,
      tenantId:'2b9db4e2-b729-4de1-aef5-a6cfcc391cb0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: uuidv4(),
      email:"mohr.mateo2@gmail.com",
      name:"Mateo Mohr 2",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated: true,
      tenantId:'70c5a92d-4f44-412d-ae80-82d5fb262815',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   { 
      id: uuidv4(),
      email:"mohr.mateo3@gmail.com",
      name:"Mateo Mohr 3",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
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
