var express = require('express')
  , router = express.Router()
const api = require('./api')
const middleware = require('./../middleware')



router.post('/api/login', api.login.login)
router.get('/api/logout', api.login.logout)
router.post('/api/request', middleware.validate, api.userReq.handle)
router.get('/api/request', middleware.validate, api.userReq.getRequest)

router.get('/*', function (req, res) {
  // res.json({ 'test': 'for default' });
  res.render('index.html');
})

module.exports = router