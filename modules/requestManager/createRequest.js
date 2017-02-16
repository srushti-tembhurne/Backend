'use strict'
const request = require('../../DB_modals/request')
const wfJob = require('../../DB_modals/workflowTask')
const reqID = require('../../DB_modals/reqIdCnt')
const wfMng = require('../workflowManager')
var mongoose = require('mongoose')
var now = require('moment')
// const promisify = require('es6-promisify')
// const wfManager = promisify(wfMng.execute, wfMng)

//TODO
// verify req parameter 
//verify req type parameter
//identify WF
//populate WF parameter
//store req in DB
//store WF in DB 
// update WF id In Req collection
//call async WF function
//send res


function createReq(req, res, next) {
    var reqType = req.body.type
    if (!reqType) {
        res.status(200).send({ result: 'Invalid request type', success: false })
    }
    else {
        if (reqType == 'create-vm') {

            const worflowJson = require('../../workflow')
            var paramArray = worflowJson.parameters
            verifyAndMapParameters(req, paramArray, cb)

            function cb(err, userReq, callback) {
                if (err) {
                    console.log('res false')
                    res.status(200).send({ result: err, success: false })
                } else {
                    console.log('res success')
                    res.status(200).send({ result: 'Request saved', state: 'processing', data: userReq, success: true })
                    // wfMng.execute()
                }
            }
            function mapSaveWfParam() {
                let newJob = new wfJob()
                newJob.current_task = 'START'
                newJob.created_on = now().format('lll')
                newJob.created_by = req.body.username
                newJob.parameters = paramArray
                newJob.tasks = worflowJson.tasks
                newJob.save(function (err, savedJob) {
                    if (err) {
                        console.log("Error while creating Job")
                    } else {

                        wfMng.execute(savedJob.jobID)
                    }

                })
            }

            process.nextTick(
                mapSaveWfParam
            )
        }

    }

}

function populateTask(worflowJson) {

}


function verifyAndMapParameters(parameter, paramJson, cb) {
    var paramName
    var missingParam = false
    var data = []

    var tempHashData = {}
    paramJson.some(function (element) {
        paramName = element.name
        if (element.isrequired && !parameter.body[paramName]) {
            missingParam = true
            return missingParam
        } else {
            element.value = parameter.body[paramName]
            tempHashData[paramName] = parameter.body[paramName]

        }
    })
    if (missingParam) {
        cb("Error Missing parameter" + paramName)


    } else {
        data.push(tempHashData)
        var newReq = new request()
        newReq.user = parameter.body.username
        newReq.data = data
        newReq.type = parameter.body["type"]
        newReq.status = "processing"
        newReq.save(function (err, saveReq) {
            if (err) {
                cb("Error unable to save request")

            } else {
                cb(null, saveReq)

            }
        })
    }

}



module.exports = createReq