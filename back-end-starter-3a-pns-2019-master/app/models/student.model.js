
const Joi = require('joi');
const BaseModel = require('../utils/base-model');

module.exports = new BaseModel('Student', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
});
