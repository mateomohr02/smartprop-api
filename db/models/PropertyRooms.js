"use strict";

module.exports = (sequelize, DataTypes) => {
  const PropertyRooms = sequelize.define(
    "PropertyRooms",

    //ESTE MODELO ALMACENA LOS DATOS DE LA COMPOSICIÓN DEL INMUEBLE
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
        onDelete: 'CASCADE'
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      garage: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
      },
      toilette: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      balcony: {
        //Almacena mts2 del balcón
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: null
      },
      garden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      livingRoom: {
        type:DataTypes.BOOLEAN,
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
          model: "Tenants",
          key: "id",
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
    },
    { timestamps: true }
  );

  return PropertyRooms;
};
