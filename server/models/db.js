const mongoose = require('mongoose');
const readLine = require('readline');
var dbURI = process.env.DB_HOST;
var gracefulShutdown;

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}

// Make the connection
mongoose.connect(dbURI, (err, res) => {;
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close( () =>{
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

if (process.platform === 'win32') {
    var rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
    rl.on('SIGUSR2', () => {
        process.emit('SIGUSR2');
    });
    rl.on('SIGTERM', () => {
        process.emit('SIGTERM');
    });
}

//For Nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//For app
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
//For Heroku app
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

//Schemas & Models
//require('../models/User');