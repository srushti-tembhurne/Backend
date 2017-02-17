'use strict'

const wfJob = require('../../DB_modals/workflowTask')
const Task = require('../../DB_modals/task')


function execute(wfJobID, reqCB) {
    getWfJobfromDB(wfJobID, reqCB)
}



function getWfJobfromDB(jobIDtosearch, callback) {
    wfJob.findOne({ jobID: jobIDtosearch }, function (err, dbWfJob) {
        if (err) { return err }
        else { return dbWfJob }
    })
        .then((data) => { mappParameters(data, callback) })
        .catch((err) => { callback(err) })
}

function mappParameters(job, callback) {
    let currentTask = job.current_task;
    let task = job.tasks[currentTask]
    // let mapArray = job.parameter_mappings[currentTask];
    console.log("currentTask " + currentTask + "taskType" + task.type)
    if (task.type == 'flow') {
        // job
        job.current_task = task.to;
        updateJobDetails(job, task.to, callback)

    } else {
        paramMapper(task, job)
    }
}


function paramMapper(taskRef, jobRef) {
    dataHash = {}
    let arrayToMap = jobRef.parameter_mappings[jobRef.current_task]
    arrayToMap.some(function (element) {
        if (element.from == 'workflow') {
            // dataHash["name"] jobRef[element.fronParameter]
        }
    })
}

function saveTaskinDB() {

}

function updateJobDetails(jobToSave, nextTask, cb) {
    // wfJob.findOneAndUpdate({ jobID: jobToSave.jobID }, { current_task: nextTask }, function (err, updateJobDetails) {
    //     if (err) {
    //         return err
    //     }
    //     else {
    //         returnupdateJobDetails
    //     }
    // })
    //     .then((result) => { execute(jobToSave.jobID, cb) })
    //     .catch((err) => { console.log(err) })
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