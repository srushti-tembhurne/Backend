"use strict";

const net = require("net"),
    request = require('request'),
    async = require('async');

var proxmoxLoginDetails = {};
var createVMObj = {};

var proxmox_config = require('../proxmox_config');


function createvm(taskObject, callback) {
    createVMObj.vmName = taskObject['vmName'];
    createVMObj.ostype = "other";
    createVMObj.ide2 = 'local:iso/' + taskObject['OS'] + ',media=cdrom';
    createVMObj.ide0 = "local:" + taskObject['diskSize'] + ",format=qcow2";
    createVMObj.cores = taskObject['cpuCore'];
    createVMObj.memory = taskObject['Memory'];
    createVMObj.taskid = taskObject['taskID'];
    try {
        net.createConnection(proxmox_config.port, proxmox_config.host).on("connect", function (e) {
            console.log(proxmox_config.host + " is pingable ");
            var headers, options;

            // Set the headers
            headers = {
                'User-Agent': 'request',
                'Content-Type': 'application/x-www-form-urlencoded'
            }

            // Configure the request
            options = {
                url: proxmox_config.baseurl + '/access/ticket',
                method: 'POST',
                headers: headers,
                rejectUnauthorized: false,
                qs: { username: proxmox_config.username, password: proxmox_config.password, realm: proxmox_config.realm }
            }

            // Start the request
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var _response = JSON.parse(body);
                    proxmoxLoginDetails.CSRFPreventionToken = _response.data.CSRFPreventionToken;
                    proxmoxLoginDetails.ticket = _response.data.ticket;
                    getNextVMIDandNode(callback);
                } else {
                    var data = {};
                    data.status = false;
                    data.taskid = createVMObj.taskid;
                    data.StatusMessage = response.statusMessage;
                    callback(data);
                }
            });
        }).on("error", function (e) {
            var data = {};
            data.status = false;
            data.taskid = createVMObj.taskid
            data.StatusMessage = "Error: Proxmox server is not reachable.";
            callback(data)
        });
    } catch (error) {
        var data = {};
        data.status = false;
        data.taskid = createVMObj.taskid
        data.StatusMessage = "Error in testport";
        callback(data)
    }
}


var getNextVMIDandNode = function (callback) {
    var obj;
    async.parallel([
        /*
         * Get Next VM_ID
         */
        function (callback) {
            var headers, options;
            // Set the headers
            headers = {
                'User-Agent': 'request',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PVEAuthCookie=' + proxmoxLoginDetails.ticket,
                'CSRFPreventionToken': proxmoxLoginDetails.CSRFPreventionToken
            }
            // Configure the request
            options = {
                url: proxmox_config.baseurl + "/cluster/nextid",
                method: 'GET',
                headers: headers,
                rejectUnauthorized: false
            }
            request(options, function (error, response, body) {
                // JSON body
                if (!error && response.statusCode == 200) {
                    obj = JSON.parse(body);
                } else {
                    callback(true);
                    return;
                }
                callback(false, obj);
            });
        },
        /*
         * Get Node Details
         */
        function (callback) {
            var headers, options;
            // Set the headers
            headers = {
                'User-Agent': 'request',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'PVEAuthCookie=' + proxmoxLoginDetails.ticket,
                'CSRFPreventionToken': proxmoxLoginDetails.CSRFPreventionToken
            }
            // Configure the request
            options = {
                url: proxmox_config.baseurl + "/nodes",
                method: 'GET',
                headers: headers,
                rejectUnauthorized: false
            }
            request(options, function (error, response, body) {
                // JSON body
                if (!error && response.statusCode == 200) {
                    obj = JSON.parse(body);
                } else {
                    callback(true);
                    return;
                }
                callback(false, obj);
            });
        },
    ],
        /*
         * Collate results
         */
        function (error, results) {
            if (error) {
                var error = {};
                error.status = false;
                error.taskid = createVMObj.taskid
                error.StatusMessage = "Internal Server error."
                callback(error);
                return;
            } else {
                createVMObj.vmid = results[0].data;
                createVMObj.nodeName = results[1].data[0].node;

                //Create vm
                if (createVMObj.vmid != '' && createVMObj.nodeName != '') {
                    createVMOnProxmox(callback);
                } else {
                    var error = {};
                    error.status = false;
                    error.taskid = createVMObj.taskid
                    error.StatusMessage = "Internal Server error."
                    callback(error);
                }
            }
        }
    );
};

function createVMOnProxmox(callback) {
    try {
        console.log("Start VM Creation --> ");
        var headers, options;

        // Set the headers
        headers = {
            'User-Agent': 'request',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PVEAuthCookie=' + proxmoxLoginDetails.ticket,
            'CSRFPreventionToken': proxmoxLoginDetails.CSRFPreventionToken
        }

        // Configure the request
        options = {
            url: proxmox_config.baseurl + '/nodes/' + createVMObj.nodeName + '/qemu',
            method: 'POST',
            headers: headers,
            rejectUnauthorized: false,
            qs: { vmid: createVMObj.vmid, ostype: createVMObj.ostype, ide2: createVMObj.ide2, ide0: createVMObj.ide0, cores: createVMObj.cores, memory: createVMObj.memory, name: createVMObj.vmName }
        }

        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var _response = JSON.parse(body);
                _response.status = true;
                _response.vmid = createVMObj.vmid;
                _response.taskid = createVMObj.taskid
                _response.node = createVMObj.nodeName;
                callback(_response);
            } else {
                var error = {};
                error.status = false;
                error.taskid = createVMObj.taskid
                error.StatusMessage = response.statusMessage
                callback(error);
            }
        });

    } catch (error) {
        var error = {};
        error.status = false;
        error.taskid = createVMObj.taskid
        error.StatusMessage = "Error in testport"
        callback(error);
    }
}

module.exports = createvm