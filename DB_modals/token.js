var mongoose = require( 'mongoose' );

var tokenSchema = new mongoose.Schema({
  token: {type: String, unique:true},
  user:  String,
  useragent: String,
  created_at:{type:Date,default:Date.now}
});


module.exports = mongoose.model('token', tokenSchema);
