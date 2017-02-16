'use strict'
var requestModel = require('../../DB_modals/request');


function getReq(req, res, next) {
        var username = req.headers['username'];
        requestModel.find({ user: username }, function (err, requests) {
                if (err) {
                        res.status(200).send({ user: username, success: false, result: 'Error to fetch Request for this user.' });
                } else {
                        if (requests == null) {
                                res.status(200).send({ user: username, success: true, result: 'No Request found for this user.' });
                        } else {
                                res.status(200).send({ user: username, success: true, result: requests });
                        }
                }
        });
}


module.exports = getReq;