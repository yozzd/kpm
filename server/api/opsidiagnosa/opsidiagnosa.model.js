'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OpsiDiagnosaSchema = new Schema({
    opsi: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('OpsiDiagnosa', OpsiDiagnosaSchema);
