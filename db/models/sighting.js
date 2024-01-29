'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sighting extends Model {

    static associate(models) {
      this.hasMany(models.comment)
      this.belongsToMany(models.category, { through: "sightingsCategories" });
    }
  }
  sighting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      location: {
        type: DataTypes.STRING,
      },
      notes: {
        type: DataTypes.TEXT,
      }, 
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "sighting",
      underscored: true,
    }
  );
  return sighting;
};