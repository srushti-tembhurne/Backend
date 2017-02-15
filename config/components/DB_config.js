'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  MONGO_URI: joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(({MONGO_URI:'mongodb://localhost/DCMF'}), envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  MONGO_URI: envVars.MONGO_URI
}

module.exports = config
