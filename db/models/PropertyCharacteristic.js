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
          model: "property",
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      characteristicId: {
        type: DataTypes.UUID,
        references: {
          model: "characteristic",
          key: "id",
        },
        allowNull: false,
      },
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "tenant",
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
