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
          //Save Filters
          "filter",

          //Navigation Stats
          "visit_site",
          "visit_blog",
          "visit_contact",
          "interaction_prop",
          "visualization_prop",
          "post_detail_blog",

          //Buttons Stats
          "whatsapp",
          "instagram",
          "form_send",
          "share_prop",
          "post_share_blog"
        ),
        allowNull: false
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      postId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      metadata: {
        type: Sequelize.JSONB,
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
