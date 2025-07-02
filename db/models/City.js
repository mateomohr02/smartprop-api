'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
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
    provinceId:{
      type: DataTypes.UUID,
      references: {
        model: "province",
        key: "id"
      },
      allowNull: false
    },
  }, { timestamps: true });

  return City; 
};
