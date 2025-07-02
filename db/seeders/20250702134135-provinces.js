"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Provinces", [
      {
        id: "cca3a9d9-9443-49e6-b6d3-2ca3c5d47dff",
        name: "Entre Ríos",
        slug: "entre-rios",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "ed0eb7c7-b527-47b3-909b-eaa97224b522",
        name: "Córdoba",
        slug: "cordoba",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "df21db91-1acb-4af4-8df5-c0098bc6b5c4",
        name: "Santa Fé",
        slug: "santa-fe",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "44730c38-c074-4359-b28e-e4496fbda850",
        name: "Mendoza",
        slug: "mendoza",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "658f54d7-5f3a-48d8-ab7d-7db7ec4d343e",
        name: "Buenos Aires",
        slug: "buenos-aires",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "84446462-9955-4c20-8ca3-d5f5c23f7828",
        name: "Neuquén",
        slug: "neuquen",
        countryId: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
      },
      {
        id: "e30dadbf-312a-45eb-867e-956c994ba5f8",
        name: "Río Grande do Sul",
        slug: "rio-grande-do-sul",
        countryId: "7186e3a1-5ed2-4efc-a2ba-da1bafee4194",
      },
      {
        id: "1f33d6cc-c090-475f-97cc-73df9e24f298",
        name: "Santa Catarina",
        slug: "santa-catarina",
        countryId: "7186e3a1-5ed2-4efc-a2ba-da1bafee4194",
      },
      {
        id: "b562b313-0f1a-4965-baf9-626134a14931",
        name: "Paraná",
        slug: "parana",
        countryId: "7186e3a1-5ed2-4efc-a2ba-da1bafee4194",
      },
      {
        id: "273a88e9-3775-4d1f-8fe9-4ed34c516c69",
        name: "São Paulo",
        slug: "sao-paulo",
        countryId: "7186e3a1-5ed2-4efc-a2ba-da1bafee4194",
      }
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Provinces", {
      slug: [
        "sao-paulo",
        "parana",
        "santa-catarina",
        "rio-grande-do-sul",
        "neuquen",
        "buenos-aires",
        "mendoza",
        "santa-fe",
        "cordoba",
        "entre-rios",
      ],
    });
  },
};
