'use strict'

const config = require('../config')
const mongoose = require( 'mongoose' );
mongoose.Promise = global.Promise
function conection(){
//  console.log(config.MONGO_URI);
    mongoose.connect(config.MONGO_URI);
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + config.MONGO_URI);
    });

    mongoose.connection.on('error',function (err) {
        console.log('Mongoose connection error: ' + err);
    });

    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose disconnected');
    });
    return mongoose.Connection;
}

module.exports = conection;