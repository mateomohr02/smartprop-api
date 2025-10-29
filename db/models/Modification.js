"use strict";
module.exports = (sequelize, DataTypes) => {
  const Modification = sequelize.define(
    "Modification",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      propertyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
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
      metadata: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      indexes: [
        { fields: ["tenantId"] },
        { fields: ["propertyId"] },
        { fields: ["userId"] },
      ],
    }
  );

  return Modification;
};
