"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PropertyDailyStats", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      visualizations: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      interactions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      reach: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      heat: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // índices
    await queryInterface.addIndex("PropertyDailyStats", ["propertyId"]);
    await queryInterface.addConstraint("PropertyDailyStats", {
      fields: ["propertyId", "year", "month", "day"],
      type: "unique",
      name: "unique_property_daily",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("PropertyDailyStats");
  },
};
