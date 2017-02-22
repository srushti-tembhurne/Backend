'use strict'

const wfJob = require('../../DB_modals/workflowTask')
const Task = require('../../DB_modals/task')
const now = require('moment')
const taskMng = require('../taskManager')
var testfunc = '';

function execute(wfJobID, reqCB) {
    testfunc = reqCB;
    getWfJobfromDB(wfJobID, reqCB)
}



function getWfJobfromDB(jobIDtosearch, callback) {
    wfJob.findOne({ jobID: jobIDtosearch })
        .then((data) => { mappParameters(data, callback) })
        .catch((err) => { callback(jobIDtosearch) })
}

function mappParameters(job, callback) {
    let currentTask = job.current_task;
    let task = job.tasks[currentTask]

    if (task.type == 'flow') {
        if (task.name == 'END') {
            callback(null, { job: job, status: "completed" })
        }
        else {
            updateJobDetails(job.jobID, task.to, callback) //to update the current task of WorkFlow
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
            taskMng.taskExecuer(result.taskID, wfCallback)
        })
        .catch((error) => {
            console.log('error' + error)
            //if error while saving task 
        })
}

function wfCallback(err, taskID) {
    if (err) {
        // console.log('wf Error occured' + err)
        Task.findOne({ taskID: err.taskId })
            .then((data) => {
                wfJob.findOne({ jobID: data.wfID }, (error, result) => {
                    if (error) {
                        console.log('error while finding wf job')
                    }
                    else {
                        testfunc({ reqID: result.reqID, errMsg: err.errMsg })
                    }
                })
            })
    }
    else {
        Task.findOne({ taskID: taskID })
            .then((data) => {
                wfJob.findOne({ jobID: data.wfID }, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var jobPromise = new Promise((resolve, reject) => {
                            result.tasks[data.name] = data
                            wfJob.update({ _id: result._id }, result, (err, jobData) => {
                                if (err) {
                                    reject(err)
                                }
                                else {
                                    resolve({ ID: result.jobID, to: data.to })
                                }
                            })
                        })
                            .then((data) => {
                                updateJobDetails(data.ID, data.to, testfunc)
                            })
                    }
                })

            })
            .catch((err) => { console.log(err) })
    }
}

function updateJobDetails(jobToSave, nextTask, cb) {
    let jobIBtoPass;
    wfJob.findOne({ jobID: jobToSave })
        .then((data) => {
            var newPromise = new Promise(function (resolve, reject) {
                var localData = data;
                data.update({ current_task: nextTask }, (err, jobSaved) => {
                    if (err) {
                        console.log("Error ocurred while saving data " + err)
                        reject(err)
                    }
                    else {
                        resolve(localData)
                    }
                })
            })
            newPromise.then((result) => {
                execute(result.jobID, testfunc)
            })
            newPromise.catch((err) => {
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })


}


module.exports = execute;