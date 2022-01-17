'use strict';
const { Model } = require('sequelize');

const secrets = [
  "password",
  "createdAt",
  "updatedAt",
  "deletedAt",
];
module.exports = (sequelize, DataTypes) => {
  class Proctor extends Model { };
  Proctor.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    proctor_id: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Proctor',
  });
  Proctor.prototype.purge = function() {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
      if (!secrets.includes(key)) {
        clean[key] = this.dataValues[key];
      }
    }
  return clean;
  };
  return Proctor;
};