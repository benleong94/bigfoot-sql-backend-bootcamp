"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class sightingCategories extends Model {
    static associate(models) {
      this.belongsTo(models.sighting);
      this.belongsTo(models.category);
    }
  }
  sightingCategories.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sighting_id: {
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
    },
    {
      sequelize,
      modelName: "sightingsCategories",
      underscored: true,
    }
  );
  return sightingCategories;
};
