'use strict'

const wfJob = require('../../DB_modals/workflowTask')


function execute(wfJobID) {
    var dbWfJob

    // let wfJobPromise = wfJob.findOne({ jobID: wfJobID }).exec()
    // wfJobPromise.then((data) => { dbWfJob = data })

    wfJob.findOne({ jobID: wfJobID }, function (err, dbWfJob) {
        if (err) return console.log(err)
        return dbWfJob
    }).then(function (data) { dbWfJob = data })
        .catch(function (err) { console.log('err occured ' + err) })
    // console.log(dbWfJob)
}


function getWfJobfromDB() {

}


module.exports = execute;