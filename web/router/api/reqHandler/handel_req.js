'use strict'

const reqManager = require("../../../../modules/requestManager");


function handle_request(req,res,next){
    reqManager.createReq(req,res,next);
}


module.exports = handle_request;