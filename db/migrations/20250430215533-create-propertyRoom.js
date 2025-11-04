"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PropertyRooms", {
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
      roomId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
        onDelete: 'CASCADE'
      },
      value: {
        type: Sequelize.INTEGER, 
        allowNull: false,
        defaultValue: 1,
      },
      size: {
        type: Sequelize.ARRAY(Sequelize.FLOAT), 
        allowNull: true,
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
    await queryInterface.dropTable("PropertyRooms");
  },
};
