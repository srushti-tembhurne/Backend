"use strict";

const net = require("net"),
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    fs = require('fs'),
    https = require('https'),
    async = require('async'),
    promisify = require('es6-promisify');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var proxmoxLoginDetails = {};
var createVMObj = {};
var proxmox_config = require('../proxmox_config');

function genericCallback(message) {
    console.log(message);
    return message;
}

function createvm(taskObject, callback) {
    createVMObj.vmName = taskObject['name'];
    createVMObj.ostype = "other";
    createVMObj.ide2 = 'local:iso/'+taskObject['os']+',media=cdrom';
    createVMObj.ide0 = "local:" + taskObject['size'] + ",format=qcow2";
    createVMObj.cores = taskObject['cores'];
    createVMObj.memory = taskObject['memory'];
    try {
        net.createConnection(proxmox_config.port, proxmox_config.host).on("connect", function (e) {
            console.log("192.168.208.130 is pingable ");
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
                    getNextVMIDandNode(genericCallback);
                } else {
                    var data = {};
                    data.status = false;
                    data.StatusMessage = response.statusMessage;
                    callback(data);
                }
            });
        }).on("error", function (e) {
            var data = {};
            data.status = false;
            data.StatusMessage = "Error: Proxmox server is not reachable.";
            callback(data)
        });
    } catch (error) {
        var data = {};
        data.status = false;
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
                    console.log(error);
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
                    console.log(response.statusCode);
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
                error.StatusMessage = "Internal Server error."
                callback(error);
                return;
            } else {
                createVMObj.vmid = results[0].data;
                createVMObj.nodeName = results[1].data[0].node;
                console.log(JSON.stringify(createVMObj));
                //Create vm
                console.log("Calling createVM()" + createVMObj.vmName);
               
                if (createVMObj.vmid != '' && createVMObj.nodeName != '') {
                    createVMOnProxmox(genericCallback);
                } else {
                    var error = {};
                    error.status = false;
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
                _response.node = createVMObj.nodeName;
                callback(_response);
            } else {
                var error = {};
                error.status = true;
                error.StatusMessage = response.statusMessage
                callback(error);
            }
        });

    } catch (error) {
        var error = {};
        error.status = false;
        error.StatusMessage = "Error in testport"
        callback(_response);
    }
}

module.exports = createvm