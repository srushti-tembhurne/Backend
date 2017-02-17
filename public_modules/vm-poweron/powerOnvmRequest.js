"use strict";

const net = require("net"),
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    fs = require('fs'),
    https = require('https'),
    async = require('async'),
    promisify = require('es6-promisify');

var proxmoxLoginDetails = {};
var vmObj = {};
var proxmox_config = require('../proxmox_config');

function genericCallback(message) {
    console.log(message);
    return message;
}

function poweronvm(taskObject, callback) {
    vmObj.nodeName = taskObject['node']
    vmObj.vmid = taskObject['vmid']
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
                    poweron(genericCallback);
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

function poweron(callback) {
    try {
        console.log("Power ON VM --> ");
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
            url: proxmox_config.baseurl + '/nodes/' + vmObj.nodeName + '/qemu/'+vmObj.vmid+'/status/start',
            method: 'POST',
            headers: headers,
            rejectUnauthorized: false
        }

        // Start the request
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var _response = JSON.parse(body);
                _response.status = true;
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

module.exports = poweronvm