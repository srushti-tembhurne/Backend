/* eslint-disable global-require, import/no-dynamic-require */

'use strict'

// load .env in local development
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ silent: true })
}

if(!process.env.PROCESS_TYPE){
  process.env.PROCESS_TYPE = 'web';
}

const processType = process.env.PROCESS_TYPE

let config
try {
  config = require(`./${processType}`)
  // config = require("./web")
} catch (ex) {
  if (ex.code === 'MODULE_NOT_FOUND') {
    throw new Error(`No config for process type: ${processType}`)
  }

  throw ex
}

module.exports = config
