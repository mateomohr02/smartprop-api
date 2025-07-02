"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Countries", [
      {
        id: "e2712aa9-6e16-4062-a79a-29b47efcf03b",
        name: "Argentina",
        slug: "-argentina",
      },
      {
        id: "7186e3a1-5ed2-4efc-a2ba-da1bafee4194",
        name: "Brasil",
        slug: "-brasil",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Countries", {
      name: ["Brasil", "Argentina"],
    });
  },
};
