"use strict";
module.exports = (sequelize, DataTypes) => {
  const Characteristic = sequelize.define(
    "Characteristic",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "Tenants",
          key: "id", 
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
    },
    { timestamps: true }
  );

  return Characteristic;
};
