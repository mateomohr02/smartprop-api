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
        allowNull: false,
        references: {
          model: "Properties",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      value: {
        type: DataTypes.INTEGER, // cantidad del ambiente
        allowNull: false,
        defaultValue: 1,
      },
      size: {
        type: DataTypes.ARRAY(DataTypes.FLOAT), //arreglo de floats -> indican los tamaños en caso de que hayan más de uno [10.5,5] serían mts2
        allowNull: true,
      },
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "Tenants",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    { timestamps: true }
  );

  return PropertyRoom;
};
