'use strict'

const reqManager = require("../../../../modules/requestManager");


function get_Request(req,res,next){
    reqManager.getReq(req,res,next);
}


module.exports = get_Request;