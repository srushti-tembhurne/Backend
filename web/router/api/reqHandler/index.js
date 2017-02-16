'use strict'

const handle_request = require('./handel_req')
const get_Request = require('./handel_getReq')
module.exports = {
  // eslint-disable-next-line
  handle: handle_request,
  getRequest: get_Request
}