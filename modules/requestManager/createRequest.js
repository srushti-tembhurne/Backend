'use strict'
const request = require('../../DB_modals/request');
const reqID = require('../../DB_modals/reqIdCnt');
const wfMng = require('../workflowManager');
var mongoose = require('mongoose');
const promisify = require('es6-promisify')
const wfManager = promisify(wfMng.execute, wfMng)

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
    var reqType = req.body.type;
    if (!reqType) {
        res.status(200).send({ result: 'Invalid request type', success: false });
    }
    else {
        if (reqType == 'create-vm') {
          
            const worflowJson = require('../../workflow')
            var paramArray = worflowJson[0].parameters;
            verifyAndMapParameters(req, paramArray,cb);
            
            function cb(err, userReq, callback) {
                if (err) {
                    res.status(200).send({ result: err, success: false })
                } else {
                    res.status(200).send({ result: 'Request saved', state:'processing' ,data: userReq, success: true })
                    wfMng.execute();
                }
            }
            
        }
        
    }

}

function populateTask(worflowJson){

}


function verifyAndMapParameters(parameter, paramJson,cb) {
    var paramName;
    var missingParam = false;
    var data = [];
    
    var tempHashData = {}
    paramJson.some(function (element) {
        paramName = element.name
        if (element.isrequired && !parameter.body[paramName]) {
            missingParam = true;
            return missingParam;
        } else {
            element.value = parameter.body[paramName];
            tempHashData[paramName] = parameter.body[paramName] 
            
        }
    });
    if (missingParam) {
        cb("Error Missing parameter" + paramName)
        

    } else {
        data.push(tempHashData)
        var newReq = new request();
        newReq.user = parameter.body.username
        newReq.data = data
        newReq.type = parameter.body["type"]
        newReq.status = "processing"
        newReq.save(function (err, saveReq) {
            if (err) {
                cb("Error unable to save request")
                
            } else {
                cb(null,saveReq)
                
            }
        });
    }

}



module.exports = createReq;