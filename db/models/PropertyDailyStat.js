"use strict";
module.exports = (sequelize, DataTypes) => {
  const PropertyDailyStat = sequelize.define(
    "PropertyDailyStat",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      day: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 31 },
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 12 },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      visualizations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      interactions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      reach: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      heat: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["propertyId", "year", "month", "day"],
        },
        {
          fields: ["propertyId"],
        },
      ],
    }
  );

  return PropertyDailyStat;
};
