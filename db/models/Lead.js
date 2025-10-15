"use strict";
module.exports = (sequelize, DataTypes) => {
  const Lead = sequelize.define(
    "Lead",
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
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "new",
          "seen",
          "replied",
          "dismissed"
        ),
        allowNull: false,
        defaultValue: "new",
      },
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
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

  return Lead;
};
