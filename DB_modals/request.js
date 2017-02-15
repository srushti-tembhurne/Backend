var mongoose = require( 'mongoose' );

var CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
var counter = mongoose.model('counter', CounterSchema);

var reqSchema = new mongoose.Schema({
  id: { type: String,index: { unique: true }},
  user:  String,
  data:[],
  type:{type:String,required:true},
  status:{type:String},
  wfID:{type:Number}
},{
    versionKey: false // You should be aware of the outcome after set to false
});


reqSchema.pre('save', function(next) {
    var req = this;
    counter.findByIdAndUpdate({_id: 'req'}, {$inc: { seq: 1} }, function(error, counter)   {
        if(error)
            return next(error);
        req.id = counter.seq;
        next();
    });
});

module.exports = mongoose.model('request', reqSchema);
