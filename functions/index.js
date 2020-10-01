const admin = require('firebase-admin');
admin.initializeApp();

exports.drive = require('./drive');
exports.presentations = require('./presentations');
exports.users = require('./users');
exports.search = require('./search');
