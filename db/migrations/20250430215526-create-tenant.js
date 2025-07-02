'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Tenants', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      googleAnalyticsId: {
        type: Sequelize.STRING
      },
      googleAdsId: {
        type: Sequelize.STRING
      },
      googleTagManagerId: {
        type: Sequelize.STRING
      },
      tikTokPixelId: {
        type: Sequelize.STRING
      },
      metaPixelId: {
        type: Sequelize.STRING
      },
      isInternational: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Tenants');
  }
};
