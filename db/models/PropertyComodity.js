"use strict";

const Comodity = require("./Comodity");

module.exports = (sequelize, DataTypes) => {
  const PropertyComodity = sequelize.define(
    "PropertyComodity",

    //ESTE MODELO ALMACENA LAS COMODITIES DEL INMUEBLE/RECINTO
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
          model: "Properties",
          key: "id",
        },
        onDelete: 'CASCADE'
      },
      comodityId: {
        type: DataTypes.UUID,
        allownull: false,
        references: {
          model: "Comodities",
          key: "id",
        },
        onDelete: 'CASCADE'
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

  return PropertyComodity;
};
