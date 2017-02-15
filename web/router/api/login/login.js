'use strict'

var now = require('moment')
var User = require('../../../../DB_modals/user')
const Token = require("../token");


function login(req,res,next){
    User.findOne({email:req.body.email}, function(err,user){
      if(user==null){
       res.status(200).send({result:'No account with this email',success:false});
      }
     else{
      req.body.username=user.username;
      user.comparePassword(req.body.password,function(err,isMatch){
       if(isMatch && isMatch==true){
          Token.create_token.create(req,res,next);
         res.status(200).send({token: req.token,username: req.body.username,success:true,created_at:req.created_at,expiry_in:req.expiry_in});
        
       }else{
         res.status(200).send({result:'Invalid email or password',success:false});
       }
     });
     }
    });
}

module.exports=login;