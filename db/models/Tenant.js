'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tenant = sequelize.define('Tenant', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false
    },
    googleTagManagerId: DataTypes.STRING,
    googleAnalyticsId: DataTypes.STRING,
    googleAdsId: DataTypes.STRING,
    tikTokPixelId:DataTypes.STRING,
    metaPixelId: DataTypes.STRING,
    isInternational: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull:false
    },
    domain:DataTypes.STRING
  }, { timestamps: true });

  return Tenant; 
};
