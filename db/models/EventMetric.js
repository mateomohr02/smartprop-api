"use strict";
module.exports = (sequelize, DataTypes) => {
  const EventMetric = sequelize.define(
    "EventMetric",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      eventType: {
        type: DataTypes.ENUM(
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
        allowNull: false,
      },
      //id del post o de la prop
      propertyId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      postId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      //Información extra para filtros, etc.
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    { timestamps: true }
  );

  return EventMetric;
};
