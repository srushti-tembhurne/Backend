'use strict'

const common = require('./components/common')
const logger = require('./components/logger')
const server = require('./components/server')
const DB = require('./components/DB_config')

module.exports = Object.assign({}, common, logger, server,DB)
