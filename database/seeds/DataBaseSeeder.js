'use strict';
require('dotenv').config();
require('../../server/models/User');
const db_host = process.env.DB_HOST;
const mongoose = require('mongoose');

var seeds = [
    require('./UsersSeeder.js')
];
var seedsDone = 0;

// Make the connection
mongoose.connect(db_host, (err, res) => {
    if (err) throw 'ERROR: connecting to Database. ' + err;
    console.log('Mongoose connected to ' + db_host);
    mongoose.connection.db.dropDatabase();
    seeds.forEach((seed) => {
        seed(next);
    });
});

var next = () => {
    seedsDone++;
    if (seedsDone === seeds.length) {
        mongoose.connection.close(function () {
            console.log(`Seeding Completed! (${seedsDone} seeds)`);
        });
    }
};