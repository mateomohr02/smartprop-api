'use strict';
module.exports = (sequelize, DataTypes) => {
  const Neighborhood = sequelize.define('Neighborhood', {
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
    cityId:{
      type: DataTypes.UUID,
      references: {
        model: "city",
        key: "id"
      },
      allowNull: false
    },
  }, { timestamps: true });

  return Neighborhood; 
};
