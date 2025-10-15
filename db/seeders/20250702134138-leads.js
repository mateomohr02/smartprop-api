"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Leads", [
      {
        id: uuidv4(),
        name: "Mateo Mohr",
        phone: "+54 3751 613750",
        email: "mohr.mateo@gmail.com",
        message: "Me quería contactar para consultar por...",
        tenantId: "2b9db4e2-b729-4de1-aef5-a6cfcc391cb0",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: "Juan Pablo",
        phone: "+54 343 123412",
        email: "juanpa@gmail.com",
        message: "Me quería contactar para consultar por... algo. Soy Juan Pablo",
        tenantId: "2b9db4e2-b729-4de1-aef5-a6cfcc391cb0",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Leads", {
      name: [
        "Mateo Mohr",
        "Juan Pablo"
      ],
    });
  },
};
