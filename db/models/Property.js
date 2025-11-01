"use strict";
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      //INICIALIZACIÓN
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        defaultValue: "draft",
        allowNull: false,
      },
      propertyTypeId: {
        type: DataTypes.UUID,
        references: {
          model: "PropertyTypes",
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
        onDelete: "CASCADE",
      },

      //2 PASO: GUARDANDO DATOS DE LA PROPIEDAD
      price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      priceFIAT: {
        type: DataTypes.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },
      expenses: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expensesFIAT: {
        type: DataTypes.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },
      operation: {
        type: DataTypes.ENUM("sale", "rent", "short-term"),
        allowNull: true,
      },
      financing: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      garages: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      surface: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          covered: null,
          total: null,
        },
      },
      services: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          light: true,
          water: true,
          gas: true,
        },
      },
      condition: {
        type: DataTypes.ENUM("new", "like-new", "good", "to-renovate"),
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      availabilityType: {
        type: DataTypes.ENUM("inmediate", "date"),
        allowNull: true,
      },
      availabilityDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: true,
      },

      //3 PASO: GUARDANDO UBICACIÓN
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mapLocation: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: {
          lat: "",
          lng: "",
        },
      },
      countryId: {
        type: DataTypes.UUID,
        references: {
          model: "country",
          key: "id",
        },
        allowNull: true,
      },
      provinceId: {
        type: DataTypes.UUID,
        references: {
          model: "province",
          key: "id",
        },
        allowNull: true,
      },
      cityId: {
        type: DataTypes.UUID,
        references: {
          model: "city",
          key: "id",
        },
        allowNull: true,
      },
      neighborhoodId: {
        type: DataTypes.UUID,
        references: {
          model: "neighborhood",
          key: "id",
        },
        allowNull: true,
      },

      //4 PASO: AÑADIENDO MULTIMEDIA
      multimedia: {
        type: DataTypes.JSONB,
        allowNull: true,
      },

      //5 PASO: AÑADIENDO CARACTERÍSTICAS

      //6 PASO: AÑADIENDO COMODIDADES

      //7 PASO: AÑADIENDO INFORMACIÓN DE LOS AMBIENTES

      //8 PASO: PUBLICAR

      //MÉTRICAS / MUESTRA AL PÚBLICO
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },

      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      heat: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      reach: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      visualizations: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      interactions: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },

      slug: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );

  return Property;
};
