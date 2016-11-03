'use strict';
const mongoose = require('mongoose');
const crypto = require('crypto');

const SALT_LEN = 16;
const ITERATIONS = 1000;
const KEY_LEN = 64;
const DIGEST = 'sha512';

let schema = new mongoose.Schema({
    email:  {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    passwordSalt: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        'default': 'user'
    }
});

schema.methods.validPassword = function (password) {
    let hash = this.constructor.hashPassword(password, this.passwordSalt);
    return this.password === hash;
};

schema.statics.getSalt = function() {
    return crypto.randomBytes(SALT_LEN).toString('hex');
};

schema.statics.hashPassword = function (password, salt) {
    salt = salt || this.getSalt();
    return crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LEN, DIGEST).toString('hex');
};

mongoose.model('User', schema);