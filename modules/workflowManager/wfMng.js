'use strict'

const wfJob = require('../../DB_modals/workflowTask')
const Task = require('../../DB_modals/task')
const now = require('moment')

function execute(wfJobID, reqCB) {
    getWfJobfromDB(wfJobID, reqCB)
}



function getWfJobfromDB(jobIDtosearch, callback) {
    wfJob.findOne({ jobID: jobIDtosearch })
        .then((data) => { mappParameters(data, callback) })
        .catch((err) => { callback(err) })
}

function mappParameters(job, callback) {
    let currentTask = job.current_task;
    let task = job.tasks[currentTask]

    if (task.type == 'flow') {
        if (task.name == 'END') {
            callback(null, { job: job, status: "completed" })
        }
        else {
            updateJobDetails(job, task.to, callback) //to update the current task of WorkFlow
        }

    } else {
        paramMapper(task, job, callback) // to map parameters for task
    }
}


function paramMapper(taskRef, jobRef, next) {

    let arrayToMap = jobRef.parameter_mappings[jobRef.current_task] // retriving the parameter mapping array
    arrayToMap.some(function (element) {
        if (element.from == 'workflow') { // if the parameters are taken from workflow
            taskRef.input_params[element.to].value = jobRef.parameters[element.fronParameter].value
        } else { //if the parameters are taken from other tasks
            let fromTask = jobRef.tasks[element.from]
            taskRef.input_params[element.to].value = fromTask.output_params[element.fronParameter].value
        }
    })

    saveTaskinDB(taskRef, jobRef, next) //Save Task in DB 
}

function saveTaskinDB(taskdata, wfRef, cb) {
    let newTask = new Task()
    newTask.name = taskdata.name
    newTask.module = taskdata.module
    newTask.icon = taskdata.icon
    newTask.input_params = taskdata.input_params
    newTask.created_on = now().format('lll')
    newTask.output_params = taskdata.output_params
    newTask.to = taskdata.to
    newTask.wfID = wfRef.jobID

    newTask.save()
        .then((result) => {
            updateJobDetails(wfRef, taskdata.to, cb)
            return result;
        })
        .catch((error) => {
            console.log('error' + error)
            //if error while saving task 
        })


}

function updateJobDetails(jobToSave, nextTask, cb) {

    jobToSave.update({ current_task: nextTask }, function (err, result) {
        if (err) {
            return err
        }
        else {
            execute(jobToSave.jobID, cb)
        }
    })

}


module.exports = execute;