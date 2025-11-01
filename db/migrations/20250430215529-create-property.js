"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Properties", {
      // 1️⃣ INICIALIZACIÓN
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
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("draft", "published", "archived"),
        defaultValue: "draft",
        allowNull: false,
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

      // 2️⃣ DATOS DE LA PROPIEDAD
      price: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      priceFIAT: {
        type: Sequelize.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },
      expenses: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      expensesFIAT: {
        type: Sequelize.ENUM("ARS", "USD", "EUR", "BRL"),
        allowNull: true,
      },
      operation: {
        type: Sequelize.ENUM("sale", "rent", "short-term"),
        allowNull: true,
      },
      financing: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      garages: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      surface: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          covered: null,
          total: null,
        },
      },
      services: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: {
          light: true,
          water: true,
          gas: true,
        },
      },
      condition: {
        type: Sequelize.ENUM("new", "like-new", "good", "to-renovate"),
        allowNull: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      availabilityType: {
        type: Sequelize.ENUM("inmediate", "date"),
        allowNull: true,
      },
      availabilityDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      // 3️⃣ UBICACIÓN
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      mapLocation: {
        type: Sequelize.JSONB,
        allowNull: true,
        defaultValue: {
          lat: "",
          lng: "",
        },
      },
      countryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Countries",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      provinceId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Provinces",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cityId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Cities",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      neighborhoodId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "Neighborhoods",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      // 4️⃣ MULTIMEDIA
      multimedia: {
        type: Sequelize.JSONB,
        allowNull: true,
      },

      // 8️⃣ PUBLICACIÓN Y MÉTRICAS
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isFeatured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      heat: {
        type: Sequelize.FLOAT,
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
      slug: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      // TIMESTAMPS
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

  down: async (queryInterface) => {
    await queryInterface.dropTable("Properties");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_status";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_priceFIAT";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_expensesFIAT";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_operation";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_condition";'
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Properties_availabilityType";'
    );
  },
};
