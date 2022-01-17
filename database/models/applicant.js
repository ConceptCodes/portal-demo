'use strict';
const { Model } = require('sequelize');
const Reviews = require('./review');

const secrets = [
  "createdAt",
  "updatedAt",
  "deletedAt",
];

module.exports = (sequelize, DataTypes) => {
  class Applicant extends Model {
    associate() {
      Applicant.hasMany(Reviews, {
        foreignKey: 'applicant_id',
        as: 'reviews',
        onDelete: 'CASCADE',
      });
    }
  };
  Applicant.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    quiz_results: DataTypes.ARRAY(DataTypes.DOUBLE),
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Applicant',
  });
  Applicant.prototype.purge = function() {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
      if (!secrets.includes(key)) {
        clean[key] = this.dataValues[key];
      }
    }
  return clean;
  };
  return Applicant;
};