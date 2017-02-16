var express = require('express')
  , router = express.Router()
const api = require('./api')
const middleware = require('./../middleware')




router.post('/api/login', api.login.login)
router.post('/api/request', middleware.validate, api.userReq.handle)
router.get('/api/request', middleware.validate, api.userReq.getRequest)

router.get('/*', function (req, res) {
  res.json({ 'test': 'for default' });
})

module.exports = router