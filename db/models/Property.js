"use strict";
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      //PropertyRoom tabla intermedia de los ambientes y tipos de ambientes de la propiedad
      //PropertyComodity tabla intermedia de las comunidades del la propiedad.
      //PropertyCharacteristic tabla intermedia que almacena las referencias de las características de la propiedad.
      //Characteristic son adjetivos que describen a la propiedad: "luminoso", "acepta mascotas", "amoblado", etc...
      //Room modelo que describe los tipos de habitaciones de la propiedad: "Quincho", "Living", "Comedor"
      //PropertyType indica el tipo de Inmueble: "Casa", "Departamento,"PH", etc...

      //DATOS IMPORTANTES
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
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      priceFIAT: {
        type: DataTypes.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: false,
      },
      expenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      expensesFIAT: {
        type: DataTypes.ENUM("ARS", "USD", "BRL", "EUR"),
        allowNull: false,
        defaultValue: "ARS",
      },
      operation: {
        type: DataTypes.ENUM("sale", "rent", "short-term"),
        allowNull: false,
      },
      financing: {
        type: DataTypes.STRING,
      },
      propertyTypeId: {
        type: DataTypes.UUID,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mapLocation: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          lat: "",
          long: "",
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      multimedia: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      countryId: {
        type: DataTypes.UUID,
        references: {
          model: "country",
          key: "id",
        },
        allowNull: false,
      },
      provinceId: {
        type: DataTypes.UUID,
        references: {
          model: "province",
          key: "id",
        },
        allowNull: false,
      },
      cityId: {
        type: DataTypes.UUID,
        references: {
          model: "city",
          key: "id",
        },
        allowNull: false,
      },
      neighborhoodId: {
        type: DataTypes.UUID,
        references: {
          model: "neighborhood",
          key: "id",
        },
        allowNull: false,
      },

      //DATOS DESCRIPTIVOS
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bathrooms: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      surface: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          covered: "",
          total: "",
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
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availabilityType: {
        type: DataTypes.ENUM("inmediate", "date"),
        allowNull: false,
      },
      availabilityDate: {
        type: DataTypes.DATE,
        defaultValue: new Date()
      },

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
        type: DataTypes.INTEGER,
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

      //PROPIETARIO
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "tenant",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    { timestamps: true }
  );

  return Property;
};
