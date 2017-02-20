/* eslint-disable global-require */

'use strict'

const logger = require('winston')

const type = process.env.PROCESS_TYPE


logger.info(`Starting '${type}' process`, { pid: process.pid })

if (type == 'web') {
 // console.log("in web if");
  require('./web');
}else{
  //console.log("in else");
}