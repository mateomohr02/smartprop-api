"use strict";

module.exports = (sequelize, DataTypes) => {
  const Features = sequelize.define(
    "Features",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      propertyId: {
        type: DataTypes.UUID,
        allownull: false,
        references: {
          model: "property",
          key: "id",
        },
        onDelete: 'CASCADE'
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      toilettes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      garage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      balcony: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      meetingsRoom: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pool: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      laundryRoom: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      roofTop: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      kitchen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    {}
  );

  return Features;
};
