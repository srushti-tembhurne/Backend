'use strict'
var express = require('express')
var now = require('moment')
var Token = require('../../DB_modals/token')
var jwt = require('jsonwebtoken');
const config = require('../../config')



module.exports = function(req,res,next){
console.log("in validate");
  var auth_token = req.body.token || req.query.token || req.headers['x-access-token'];
  Token.findOne({token:auth_token}, function(err,db_token_result){
    if(db_token_result == null){
      res.status(200).send({success:false,msg:'no token found'});
    }
    else{
      jwt.verify(auth_token, config.SCERET, function(err, decoded) {
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.'+err });
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          next();
        }
      });
    }

  });
}