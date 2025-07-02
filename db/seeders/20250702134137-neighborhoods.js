"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Neighborhoods", [
      {
        id: uuidv4(),
        name: "Nueva Córdoba",
        slug: "nueva-cordoba",
        cityId: "6dab2b7e-e3c0-4353-a95d-e9321d656218" //ID DE CIUDAD DE CÓRDOBA
      },
      {
        id: uuidv4(),
        name: "Güemes",
        slug: "guemes",
        cityId: "6dab2b7e-e3c0-4353-a95d-e9321d656218" //ID DE CIUDAD DE CÓRDOBA
      },
      {
        id: uuidv4(),
        name: "Cerro de las Rosas",
        slug: "cerro-de-las-rosas",
        cityId: "6dab2b7e-e3c0-4353-a95d-e9321d656218" //ID DE CIUDAD DE CÓRDOBA
      },
      {
        id: uuidv4(),
        name: "General Paz",
        slug: "general-paz",
        cityId: "6dab2b7e-e3c0-4353-a95d-e9321d656218" //ID DE CIUDAD DE CÓRDOBA
      },
      //BARIOS SANTA FÉ
      {
        id: uuidv4(),
        name: "Candioti",
        slug: "candioti",
        cityId: "3ae141b5-428f-417b-a25a-18f73a90ffd1" //ID DE CIUDAD DE SANTA FÉ
      },
      {
        id: uuidv4(),
        name: "Candiotti Norte",
        slug: "candiotti-norte",
        cityId: "3ae141b5-428f-417b-a25a-18f73a90ffd1" //ID DE CIUDAD DE SANTA FÉ
      },
      {
        id: uuidv4(),
        name: "Nueva Pompeya",
        slug: "nueva-pompeya",
        cityId: "3ae141b5-428f-417b-a25a-18f73a90ffd1" //ID DE CIUDAD DE SANTA FÉ
      },
      //BARIOS ROSARIO
      {
        id: uuidv4(),
        name: "Fisherton",
        slug: "fisherton",
        cityId: "b5d0f777-ed90-44d8-b8ae-ca818202f019"
      },
      {
        id: uuidv4(),
        name: "Alberdi",
        slug: "alberdi",
        cityId: "b5d0f777-ed90-44d8-b8ae-ca818202f019"
      },
      //BARRIOS PORTO ALEGRE
      {
        id: uuidv4(),
        name: "Moinhos de Vento",
        slug: "moinhos-de-vento",
        cityId: "9b19868b-755a-4dd8-9480-acf2b99493d5"
      },
      {
        id: uuidv4(),
        name: "Bom Fim",
        slug: "bom-fim",
        cityId: "9b19868b-755a-4dd8-9480-acf2b99493d5"
      },
      //BARIOS FLORIANOPOLIS
      {
        id: uuidv4(),
        name: "Jurerê Internacional",
        slug: "jurere-internacional",
        cityId: "2ebcfef3-0358-4870-9da0-3174ff10818e"
      },
      {
        id: uuidv4(),
        name: "Campeche",
        slug: "campeche",
        cityId: "2ebcfef3-0358-4870-9da0-3174ff10818e"
      },
      {
        id: uuidv4(),
        name: "Santo Antônio de Lisboa",
        slug: "santo-antonio-de-lisboa",
        cityId: "2ebcfef3-0358-4870-9da0-3174ff10818e"
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Neighborhoods", {
      slug: [
        "nueva-cordoba",
        "guemes",
        "cerro-de-las-rosas",
        "general-paz",
        "candioti",
        "candiotti-norte",
        "nueva-pompeya",
        "fisherton",
        "alberdi",
        "moinhos-de-vento",
        "bom-fim",
        "jurere-internacional",
        "campeche",
        "santo-antonio-de-lisboa"
      ],
    });
  },
};
