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
        // job
        job.current_task = task.to;
        updateJobDetails(job, task.to, callback)

    } else {
        paramMapper(task, job)
    }
}


function paramMapper(taskRef, jobRef) {

    let arrayToMap = jobRef.parameter_mappings[jobRef.current_task]
    arrayToMap.some(function (element) {
        if (element.from == 'workflow') {
            taskRef.input_params[element.to].value = jobRef.parameters[element.fronParameter].value
        }
    })

    let returnval = saveTaskinDB(taskRef, jobRef.jobID)
}

function saveTaskinDB(taskdata, wfID) {
    let newTask = new Task()
    newTask.name = taskdata.name
    newTask.module = taskdata.module
    newTask.icon = taskdata.icon
    newTask.input_params = taskdata.input_params
    newTask.created_on = now().format('lll')
    newTask.output_params = taskdata.output_params
    newTask.to = taskdata.to
    newTask.wfID = wfID

    newTask.save()
        .then((result) => { console.log('result' + result) })
        .catch((error) => { console.log('error' + error) })

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