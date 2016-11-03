'use strict';
const crypto = require('crypto');
const faker = require('faker');
const mongoose = require('mongoose');
const Model = mongoose.model('User');
const DOCUMENTS = 10;

var getData = () => {
    let data = [];
    let salt = Model.getSalt();
    let hash = Model.hashPassword('123456', salt); // All users with the same password

    // Admin User
    data.push({
        email: "admin@admin.com",
        name: "Admin",
        role: 'admin',
        password: hash,
        passwordSalt: salt,
        createdAt: new Date()
    });

    // Random Users
    for (let i = 0; i < DOCUMENTS; i++) {
        salt = Model.getSalt();
        hash = Model.hashPassword('123456', salt);
        data.push({
            email: faker.internet.email(),
            name: faker.name.firstName(),
            role: 'user',
            password: hash,
            passwordSalt: salt,
            createdAt: new Date()
        });
    }
    return data;
};

var seed = (callback) => {
    let data = getData();
    Model.create(data, (err, result) => {
        if (err) throw err;
        console.log("Seeding " + Model.modelName + " collection");
        callback();
    });
};

module.exports = seed;