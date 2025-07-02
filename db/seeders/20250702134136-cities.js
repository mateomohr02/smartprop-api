"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Cities", [
      {
        id: "4f824716-207c-4537-bcf7-cc35c94e6b6f",
        name: "Paraná",
        slug: "parana",
        provinceId: "cca3a9d9-9443-49e6-b6d3-2ca3c5d47dff"
      },
      {
        id: "a34d82c0-2c73-43bd-8c69-ad8ef0035f16",
        name: "Crespo",
        slug: "crespo",
        provinceId: "cca3a9d9-9443-49e6-b6d3-2ca3c5d47dff"
      },
      {
        id: "6dab2b7e-e3c0-4353-a95d-e9321d656218",
        name: "Córodoba",
        slug: "cordoba",
        provinceId: "ed0eb7c7-b527-47b3-909b-eaa97224b522"
      },
      {
        id: "dabb6c7d-0ec0-4f95-a960-ed6c17bda9cd",
        name: "San Francisco",
        slug: "san-francisco",
        provinceId: "ed0eb7c7-b527-47b3-909b-eaa97224b522"
      },
      {
        id: "241d8fcb-f5ea-4e16-a110-b9a49527ee93",
        name: "Vila Carlos Paz",
        slug: "villa-carlos-paz",
        provinceId: "ed0eb7c7-b527-47b3-909b-eaa97224b522"
      },
      {
        id: "3ae141b5-428f-417b-a25a-18f73a90ffd1",
        name: "Santa Fé",
        slug: "santa-fe",
        provinceId: "df21db91-1acb-4af4-8df5-c0098bc6b5c4"
      },
      {
        id: "b5d0f777-ed90-44d8-b8ae-ca818202f019",
        name: "Rosario",
        slug: "rosario",
        provinceId: "df21db91-1acb-4af4-8df5-c0098bc6b5c4"
      },
      {
        id: "e21fc967-e11e-4d89-82d4-74aff6451d26",
        name: "Rafaela",
        slug: "rafaela",
        provinceId: "df21db91-1acb-4af4-8df5-c0098bc6b5c4"
      },
      {
        id: "eb398f64-fd3e-4637-a263-cdce58bea41c",
        name: "Esperanza",
        slug: "esperanza",
        provinceId: "df21db91-1acb-4af4-8df5-c0098bc6b5c4"
      },
      {
        id: "9b19868b-755a-4dd8-9480-acf2b99493d5",
        name: "Porto Alegre",
        slug: "porto-alegre",
        provinceId: "e30dadbf-312a-45eb-867e-956c994ba5f8"
      },
      {
        id: "f5e207fc-f2f1-4379-b0ca-dd8760da268f",
        name: "Gramado",
        slug: "gramado",
        provinceId: "e30dadbf-312a-45eb-867e-956c994ba5f8"
      },
      {
        id: "2ebcfef3-0358-4870-9da0-3174ff10818e",
        name: "Florianópolis",
        slug: "florianopolis",
        provinceId: "1f33d6cc-c090-475f-97cc-73df9e24f298"
      },
      {
        id: "5fd51056-3355-41ae-9d69-7e94b27669dd",
        name: "Balneário Camboriú",
        slug: "balneario-camboriu",
        provinceId: "1f33d6cc-c090-475f-97cc-73df9e24f298"
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Cities", {
      slug: [
        "balneario-camboriu",
        "florianopolis",
        "gramado",
        "porto-alegre",
        "esperanza",
        "rafaela",
        "rosario",
        "santa-fe",
        "villa-carlos-paz",
        "san-francisco",
        "cordoba",
        "crespo",
        "parana",
      ],
    });
  },
};
