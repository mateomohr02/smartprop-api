"use strict";

const Comodity = require("./Comodity");

module.exports = (sequelize, DataTypes) => {
  const PropertyRoom = sequelize.define(
    "PropertyRoom",

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
      roomId: {
        type: DataTypes.UUID,
        allownull: false,
        references: {
          model: "Rooms",
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

  return PropertyRoom;
};
