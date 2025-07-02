"use strict";
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define(
    "Property",
    {
      //LAS FEATURES SE GUARDAN COMO RELACIÓN 1:1
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
        type: DataTypes.ENUM('ARS', 'USD', 'EUR', 'BRL'),
        allowNull: false,
      },
      expenses: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      expensesFIAT: {
        type: DataTypes.ENUM('ARS', 'USD', 'BRL', 'EUR'),
        allowNull: false,
        defaultValue: 'ARS'
      },
      financing: {
        type: DataTypes.STRING,
      },
      operation: {
        type: DataTypes.ENUM("sale", "rent", "short-term"),
        allowNull: false,
      },
      propertyTypeId: {
        type: DataTypes.UUID,
        references: {
          model: "propertyType",
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
      surface: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          covered: "",
          total: "",
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
      tenantId: {
        type: DataTypes.UUID,
        references: {
          model: "tenant",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      }
    },
    { timestamps: true }
  );

  return Property;
};
