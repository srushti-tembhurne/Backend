var mongoose = require('mongoose');
const counter = require('./reqIdCnt');



var taskSchema = new mongoose.Schema({
    taskID: { type: Number, index: { unique: true } },
    name: { type: String },
    module: { type: String },
    icon: { type: String },
    input_params: [],
    state: { type: String, default: 'prepared' },
    ok: { type: Number, default: 5 },
    error: { type: Number, default: 4 },
    modified_on: { type: String },
    to: { type: String },
    output_params: []
})


taskSchema.pre('save', function (next) {
    var task = this;
    counter.findByIdAndUpdate({ _id: 'task' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        task.taskID = counter.seq;
        next();
    });
});

module.exports = mongoose.model('task', taskSchema);
