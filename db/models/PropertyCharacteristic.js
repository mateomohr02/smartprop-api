"use strict";
module.exports = (sequelize, DataTypes) => {
  const PropertyCharacteristic = sequelize.define(
    "PropertyCharacteristic",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      propertyId: {
        type: DataTypes.UUID,
        references: {
          model: "Properties",
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      characteristicId: {
        type: DataTypes.UUID,
        references: {
          model: "Characteristics",
          key: "id",
        },
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

  return PropertyCharacteristic;
};
