'use strict';
module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('Province', {
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
    countryId:{
      type: DataTypes.UUID,
      references: {
        model: "country",
        key: "id"
      },
      allowNull: false
    },
  }, { timestamps: true });

  return Province; 
};
