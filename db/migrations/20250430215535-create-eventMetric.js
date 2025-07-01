'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('EventMetrics', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      eventType: {
        type: Sequelize.ENUM(
          'visit',
          'detail_prop',
          'contact',
          'form_send',
          'blog_post_detail',
          'post_share',
          'prop_share',
          'visit_blog',
          'whatsapp',
          'instagram'
        ),
        allowNull: false
      },
      entityId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Tenants', // Asegurate que el nombre de la tabla sea correcto
          key: 'id'
        },
        onDelete: 'CASCADE'
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
    // Importante: eliminar el ENUM antes de eliminar la tabla
    await queryInterface.dropTable('EventMetrics');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_EventMetrics_eventType";');
  }
};
