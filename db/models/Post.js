"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posterImage: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      multimedia: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      shared: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      heat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      visualizations: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "Tenants",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      }
    },
    { timestamps: true }
  );

  return Post;
};
