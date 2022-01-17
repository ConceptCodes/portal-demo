'use strict';
const { Model } = require('sequelize');
const Applicant = require('./applicant');

const secrets = [
  "createdAt",
  "updatedAt",
  "deletedAt",
];

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    associate() {
      Review.belongsTo(Applicant, {
        foreignKey: 'applicant_id',
        as: 'applicant',
        onDelete: 'CASCADE',
      })
    }
  };
  Review.init({
    rating: DataTypes.DOUBLE,
    comment: DataTypes.TEXT,
    strengths: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Review',
  });
  Review.prototype.purge = function() {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
      if (!secrets.includes(key)) {
        clean[key] = this.dataValues[key];
      }
    }
  return clean;
  };
  return Review;
};