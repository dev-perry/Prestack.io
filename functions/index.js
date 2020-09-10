const admin = require('firebase-admin');
admin.initializeApp();

exports.drive = require('./drive');
exports.users = require('./users');
