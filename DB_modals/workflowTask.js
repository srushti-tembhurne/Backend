var mongoose = require('mongoose');
const counter = require('./reqIdCnt');



var jobSchema = new mongoose.Schema({
  jobID: { type: String, index: { unique: true } },
  name: { type: String, default: 'CREATE_VM' },
  title: { type: String, default: 'Create new VM and Power it On' },
  description: { type: String, default: 'This process creates new VM. It also power on the newly created VM' },
  version: { type: Number, default: 1 },
  start_task: { type: String, default: 'START' },
  end_task: { type: String, default: 'POWER_ON_VM' },
  current_task: { type: String },
  created_on: { type: String },
  modified_on: { type: String },
  created_by: { type: String },
  modified_by: { type: String },
  parameters: [],
  parameter_mappings: [],
  tasks: [],
  global_paramters: []
})


jobSchema.pre('save', function (next) {
  var job = this;
  counter.findByIdAndUpdate({ _id: 'job' }, { $inc: { seq: 1 } }, function (error, counter) {
    if (error)
      return next(error);
    job.jobID = counter.seq;
    next();
  });
});

module.exports = mongoose.model('job', jobSchema);