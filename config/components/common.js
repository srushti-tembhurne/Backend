'use strict'

const joi = require('joi')

const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .required(),
  SCERET:joi.string().required()
}).unknown()
  .required()

const { error, value: envVars } = joi.validate({NODE_ENV:process.env.NODE_ENV,SCERET:"kjwdjs65$ikksop0982shj"}, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  SCERET:envVars.SCERET,
}

module.exports = config
