"use strict";

module.exports = (sequelize, DataTypes) => {
  const PropertyComodities = sequelize.define(
    "PropertyComodities",

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
      grill: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      meetingsRoom: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      pool: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      laundry: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gym: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      elevator: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      gazebo: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      caretaker: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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

  return PropertyComodities;
};
