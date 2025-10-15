"use strict";
module.exports = (sequelize, DataTypes) => {
  const MetricSummary = sequelize.define(
    "MetricSummary",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      metric: {
        type: DataTypes.STRING, // 'visit_site', 'visit_blog', etc.
        allowNull: false,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
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
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["tenantId", "date", "metric"],
        },
      ],
    }
  );

  return MetricSummary;
};
