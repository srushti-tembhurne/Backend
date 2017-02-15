var mongoose = require( 'mongoose' );

var ReqIDCnt = new mongoose.Schema({
  prefix: { type: String, required: true},
  count:  { type: Number, required: true,index: { unique: true } }
});
 



module.exports = mongoose.model('reqCnt', ReqIDCnt);
