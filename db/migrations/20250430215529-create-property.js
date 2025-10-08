"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Properties", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      priceFIAT: {
        type: Sequelize.ENUM('ARS', 'USD', 'BRL', 'EUR'),
        allowNull: false,
      },
      expenses: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      expensesFIAT: {
        type: Sequelize.ENUM('ARS', 'USD', 'BRL', 'EUR'),
        allowNull: false,
        defaultValue: 'ARS'
      },
      operation: {
        type: Sequelize.ENUM("sale", "rent", "short-term"),
        allowNull: false,
      },
      financing: {
        type: Sequelize.STRING,
      },
      propertyTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "PropertyTypes",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      mapLocation: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          lat: "",
          long: "",
        },
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      multimedia: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      provinceId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Provinces",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Cities",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      neighborhoodId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Neighborhoods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      rooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      garages: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      surface: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          covered: "",
          total: "",
        },
      },
      services: {
        type: Sequelize.JSONB,
        allowNull:false,
       defaultValue: {
        light: true,
        water: true,
        gas: true
       }
      },
      condition: {
        type: Sequelize.ENUM("new", "like-new", "good", "to-renovate"),
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      availabilityType: {
        type: Sequelize.ENUM("inmediate", "date"),
        allowNull: false,
      },
      availabilityDate: {
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      heat: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      reach: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      visualizations: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      interactions: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Tenants",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Properties");
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Properties_priceFIAT";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Properties_expensesFIAT";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Properties_operation";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Properties_condition";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Properties_availabilityType";');
  },
};
