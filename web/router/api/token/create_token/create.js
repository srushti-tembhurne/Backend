'use strict'
var express = require('express')
var now = require('moment')
var Token = require('../../../../../DB_modals/token')
var jwt = require('jsonwebtoken');
const config = require('../../../../../config')


function create(req,res,next) {
req.created_at = now().format('lll');
req.expiry_in = now().add(1,'hours').format('lll');
  req.token = jwt.sign({name:req.body.email},config.SCERET,{
          expiresIn : '1h' // expires in 24 hours
        });
  var new_token=new Token();
  new_token.token=req.token;
  new_token.user=req.body.username;
  new_token.useragent='chrome';

  new_token.save(function(err,saveToken){
      if(err){
        res.status(402).send('not abel to save token');
      }else{
        next();
      }
  });
}

module.exports = create;