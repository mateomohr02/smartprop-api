'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isValidated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    tenantId: {
      type: DataTypes.UUID,
      references: {
        model: "Tenants",
        key: "id"
      },
      allowNull: false,
      onDelete: 'CASCADE'
    }
  }, { timestamps: true });

  return User; 
};
