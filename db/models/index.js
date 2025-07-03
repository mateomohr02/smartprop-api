'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Cargar todos los modelos
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

/* RELACIONES */

// Tenant → User
db.Tenant.hasMany(db.User, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.User.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → Property
db.Tenant.hasMany(db.Property, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.Property.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → PropertyType
db.Tenant.hasMany(db.PropertyType, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.PropertyType.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → Characteristic
db.Tenant.hasMany(db.Characteristic, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.Characteristic.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → PropertyRooms
db.Tenant.hasMany(db.PropertyRooms, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.PropertyRooms.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → PropertyComities
db.Tenant.hasMany(db.PropertyComodities, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.PropertyComodities.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Tenant → PropertyCharacteristic
db.Tenant.hasMany(db.PropertyCharacteristic, { foreignKey: 'tenantId', onDelete: 'CASCADE' });
db.PropertyCharacteristic.belongsTo(db.Tenant, { foreignKey: 'tenantId' });

// Property → PropertyType
db.PropertyType.hasMany(db.Property, { foreignKey: 'propertyTypeId' });
db.Property.belongsTo(db.PropertyType, { foreignKey: 'propertyTypeId' });

// Property → PropertyRooms (1:1)
db.Property.hasOne(db.PropertyRooms, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
db.PropertyRooms.belongsTo(db.Property, { foreignKey: 'propertyId' });

// Property → PropertyComodities (1:1)
db.Property.hasOne(db.PropertyComodities, { foreignKey: 'propertyId', onDelete: 'CASCADE' });
db.PropertyComodities.belongsTo(db.Property, { foreignKey: 'propertyId' });

// Property ↔ Characteristic (N:M) via PropertyCharacteristic
db.Property.belongsToMany(db.Characteristic, {
  through: db.PropertyCharacteristic,
  foreignKey: 'propertyId',
  otherKey: 'characteristicId',
});
db.Characteristic.belongsToMany(db.Property, {
  through: db.PropertyCharacteristic,
  foreignKey: 'characteristicId',
  otherKey: 'propertyId',
});

// Ubicación de Property
db.Country.hasMany(db.Province, { foreignKey: 'countryId' });
db.Province.belongsTo(db.Country, { foreignKey: 'countryId' });

db.Province.hasMany(db.City, { foreignKey: 'provinceId' });
db.City.belongsTo(db.Province, { foreignKey: 'provinceId' });

db.City.hasMany(db.Neighborhood, { foreignKey: 'cityId' });
db.Neighborhood.belongsTo(db.City, { foreignKey: 'cityId' });

db.Property.belongsTo(db.Country, { foreignKey: 'countryId' });
db.Property.belongsTo(db.Province, { foreignKey: 'provinceId' });
db.Property.belongsTo(db.City, { foreignKey: 'cityId' });
db.Property.belongsTo(db.Neighborhood, { foreignKey: 'neighborhoodId' });

/* Sequelize y exportación */
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;