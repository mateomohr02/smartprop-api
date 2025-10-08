"use strict";
module.exports = (sequelize, DataTypes) => {
  const PropertyWeeklyStat = sequelize.define(
    "PropertyWeeklyStat",
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
          model: "Property",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1, max: 53 },
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
          fields: ["propertyId", "year", "week"],
        },
        {
          fields: ["propertyId"],
        },
      ],
    }
  );

  return PropertyWeeklyStat;
};
