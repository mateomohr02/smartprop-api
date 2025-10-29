"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Cargar todos los modelos automáticamente
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

/* =======================
      RELACIONES
======================= */

// Tenant → User
db.Tenant.hasMany(db.User, { foreignKey: "tenantId", onDelete: "CASCADE" });
db.User.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → Property
db.Tenant.hasMany(db.Property, { foreignKey: "tenantId", onDelete: "CASCADE" });
db.Property.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → PropertyType
db.Tenant.hasMany(db.PropertyType, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.PropertyType.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → Characteristic
db.Tenant.hasMany(db.Characteristic, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.Characteristic.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → Comodity
db.Tenant.hasMany(db.Comodity, { foreignKey: "tenantId", onDelete: "CASCADE" });
db.Comodity.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → Room
db.Tenant.hasMany(db.Room, { foreignKey: "tenantId", onDelete: "CASCADE" });
db.Room.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → PropertyCharacteristic
db.Tenant.hasMany(db.PropertyCharacteristic, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.PropertyCharacteristic.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Tenant → PropertyRoom
db.Tenant.hasMany(db.PropertyRoom, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.PropertyRoom.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// Property ↔ PropertyType
db.PropertyType.hasMany(db.Property, { foreignKey: "propertyTypeId" });
db.Property.belongsTo(db.PropertyType, { foreignKey: "propertyTypeId" });

// Property ↔ Room (N:M) via PropertyRoom
db.Property.belongsToMany(db.Room, {
  through: db.PropertyRoom,
  foreignKey: "propertyId",
  otherKey: "roomId",
});
db.Room.belongsToMany(db.Property, {
  through: db.PropertyRoom,
  foreignKey: "roomId",
  otherKey: "propertyId",
});

// Property ↔ Comodity (N:M) via PropertyComodity
db.Property.belongsToMany(db.Comodity, {
  through: db.PropertyComodity,
  foreignKey: "propertyId",
  otherKey: "comodityId",
});
db.Comodity.belongsToMany(db.Property, {
  through: db.PropertyComodity,
  foreignKey: "comodityId",
  otherKey: "propertyId",
});

// Property ↔ Characteristic (N:M) via PropertyCharacteristic
db.Property.belongsToMany(db.Characteristic, {
  through: db.PropertyCharacteristic,
  foreignKey: "propertyId",
  otherKey: "characteristicId",
});
db.Characteristic.belongsToMany(db.Property, {
  through: db.PropertyCharacteristic,
  foreignKey: "characteristicId",
  otherKey: "propertyId",
});

// Ubicación de Property
db.Country.hasMany(db.Province, { foreignKey: "countryId" });
db.Province.belongsTo(db.Country, { foreignKey: "countryId" });

db.Province.hasMany(db.City, { foreignKey: "provinceId" });
db.City.belongsTo(db.Province, { foreignKey: "provinceId" });

db.City.hasMany(db.Neighborhood, { foreignKey: "cityId" });
db.Neighborhood.belongsTo(db.City, { foreignKey: "cityId" });

db.Property.belongsTo(db.Country, { foreignKey: "countryId" });
db.Property.belongsTo(db.Province, { foreignKey: "provinceId" });
db.Property.belongsTo(db.City, { foreignKey: "cityId" });
db.Property.belongsTo(db.Neighborhood, { foreignKey: "neighborhoodId" });

// Property y Weekly Stats
db.Property.hasMany(db.PropertyWeeklyStat, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});
db.PropertyWeeklyStat.belongsTo(db.Property, { foreignKey: "propertyId" });

// ✅ Property y Daily Stats
db.Property.hasMany(db.PropertyDailyStat, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});
db.PropertyDailyStat.belongsTo(db.Property, { foreignKey: "propertyId" });

// ✅ Property y Modifications
db.Property.hasMany(db.Modification, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});
db.Modification.belongsTo(db.Property, { foreignKey: "propertyId" });

// ✅ User y Modifications
db.User.hasMany(db.Modification, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.Modification.belongsTo(db.User, { foreignKey: "userId" });

// ✅ Tenant y Modifications
db.Tenant.hasMany(db.Modification, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.Modification.belongsTo(db.Tenant, { foreignKey: "tenantId" });

// EventMetric ↔ Property / Post
db.EventMetric.belongsTo(db.Property, {
  foreignKey: "propertyId",
  onDelete: "CASCADE",
});
db.EventMetric.belongsTo(db.Post, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});
db.Property.hasMany(db.EventMetric, { foreignKey: "propertyId" });
db.Post.hasMany(db.EventMetric, { foreignKey: "postId" });

// Tenant → MetricSummary
db.Tenant.hasMany(db.MetricSummary, {
  foreignKey: "tenantId",
  onDelete: "CASCADE",
});
db.MetricSummary.belongsTo(db.Tenant, { foreignKey: "tenantId" });

/* Sequelize y exportación */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
