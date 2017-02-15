'use strict'

const http = require('http')
const promisify = require('es6-promisify')
const logger = require('winston')
const config = require('../config')
const DB_conc = require('../DB_conc')
const app = require('./server')
console.log("in web index");
process.env.DBconnection = DB_conc.conect();
const serverListen = promisify(app.listen, app)
serverListen(config.server.port)
  .then(() => logger.info(`App is listening on port ${config.server.port}`))
  .catch((err) => {
    logger.error('Error happened during server start', err)
    process.exit(1)
  })