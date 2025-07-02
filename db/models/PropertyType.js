'use strict';
module.exports = (sequelize, DataTypes) => {
  const PropertyType = sequelize.define('PropertyType', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug:{
        type: DataTypes.STRING,
        allowNull: false
    },    
    tenantId: {
      type: DataTypes.UUID,
      references: {
        model: "tenant",
        key: "id"
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
  }, { timestamps: true });

  return PropertyType; 
};
