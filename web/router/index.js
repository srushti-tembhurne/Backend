var express = require('express')
  , router = express.Router()
  const api = require('./api')
  const middleware = require('./../middleware')



// const jwt = require('express-jwt')
// const unless = require('express-unless')
// const config = require('../../config')



// var jwtCheck = jwt({
//     secret: config.SCERET
// });

// jwtCheck.unless = unless;



// router.use(jwtCheck.unless({path: '/api/login' }));

router.post('/api/login', api.login.login)
router.post('/api/request',middleware.validate,api.userReq.handle)
router.get('/api/request',middleware.validate,api.userReq.handle)



router.get('/*',function(req,res){
  res.json({'test':'for default'});
})

module.exports = router