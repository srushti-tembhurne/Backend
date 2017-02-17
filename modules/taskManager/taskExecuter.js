const taskList = require('../../workflow.json');
//const worker = require('../../public_modules/create-vm');
//var mongoose = require('mongoose');
//mongoose.connect('mongodb://172.17.163.56/DCMF');
const task = require('../../DB_modals/task');

function getTask(taskID) {

    var tasks = ""; /*taskList.tasks;*/
    var worker = "";

    task.findOne({ taskID: taskID }, function (err, data) {
        if (data != null) {
            console.log(data);
            execute(data, taskID);
        } else {
            console.log("Error in task")
        }
    })

}
function execute(tasks, taskID) {
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
            return false;
        }
        var change = {
            output_params: {
                vmNode: { value: data.node },
                vmID: { value: data.vmid }
            }
            , state: data.status ? 'succeeded' : 'failed'
        }
        task.update({ taskID: taskID }, change, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log(data);
            }
            // mongoose.disconnect();
        });
        console.log(data);
        return true;
    })

}
getTask("6");