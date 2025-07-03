"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PropertyComodities", {
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
      grill: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      meetingsRoom: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      pool: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      laundry: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      gym: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      elevator: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      gazebo: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      caretaker: {
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
    await queryInterface.dropTable("PropertyComodities");
  },
};
