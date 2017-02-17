const taskList = require('../../workflow.json');
//const worker = require('../../public_modules/create-vm');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://172.17.163.56/DCMF');
const task = require('../../DB_modals/task');

function getTask(taskID, callback) {

    var tasks = ""; /*taskList.tasks;*/
    var worker = "";

    task.findOne({ taskID: taskID }, function (err, data) {
        if (data != null) {
            console.log(data);
            execute(data, taskID, callback);
        } else {
            console.log("Error in task")
        }
    })

}
function execute(tasks, taskID, cb) {
    let parameter = {};
    var input_params = tasks.input_params;
    worker = require('../../public_modules/' + tasks.module);
    for (let obj in input_params) {
        parameter[obj] = input_params[obj].value;
    }
    parameter['taskID'] = taskID;
    console.log(parameter);
    worker.execute(parameter, function (data) {
        console.log("mere wala function")
        if (data.status == false) {
            console.log(data);
            cb(data)
        }
        var change = {
            output_params: {
                vmNode: { value: data.node },
                vmID: { value: data.vmid }
            }
            , state: data.status ? 'succeeded' : 'failed'
        }
        var taskPromise = new Promise(function (resolve, reject) {
            task.update({ taskID: taskID }, change, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    if (!change.state) {
                        reject("Error in executing task")
                    } else {
                        resolve(taskID);
                    }

                }
                // mongoose.disconnect();
            });
        })
        taskPromise.then((updatedTaskID) => { cb(null, updatedTaskID) })
        taskPromise.catch((err) => { cb(err) })
        console.log(data);
    })

}

module.exports = getTask