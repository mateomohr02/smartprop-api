"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Features", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      rooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      toilettes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      garage: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      balcony: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      meetingsRoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      laundryRoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      roofTop: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      kitchen: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Features");
  },
};
