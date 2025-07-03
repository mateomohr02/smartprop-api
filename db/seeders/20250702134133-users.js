'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
    { 
      id: "d1f0a6fc-6a30-415a-8293-ab832b9e2c62",
      email:"mohr.mateo@gmail.com",
      name:"Mateo Mohr",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated:true,
      tenantId:'2b9db4e2-b729-4de1-aef5-a6cfcc391cb0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: "1803d222-1c1b-4664-9ee7-94b3e5f70fad",
      email:"mohr.mateo1@gmail.com",
      name:"Mateo Mohr 1",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated: false,
      tenantId:'2b9db4e2-b729-4de1-aef5-a6cfcc391cb0',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: "019cfefa-043f-48f8-9e4e-9d643a386b68",
      email:"mohr.mateo2@gmail.com",
      name:"Mateo Mohr 2",
      password: "$2b$05$AXb643zKTEPv4m2bvpbkHeAg0AcLlrzuCd.xU6Cw7NNKIw5CISih.",
      isValidated: true,
      tenantId:'70c5a92d-4f44-412d-ae80-82d5fb262815',
      createdAt: new Date(),
      updatedAt: new Date()
    },
   { 
      id: "8b398bb5-00c3-4cbb-969a-7287194c45c6",
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
