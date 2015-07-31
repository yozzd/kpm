'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var PengobatanSchema = new Schema({
    tb: {
        type: String,
        default: '',
        trim: true
    },
    tba: {
        type: String,
        default: '',
        trim: true
    },
    tbb: {
        type: String,
        default: '',
        trim: true
    },
    tbc: {
        type: String,
        default: '',
        trim: true
    },
    tbd: {
        type: String,
        default: '',
        trim: true
    },
    nontba: {
        type: String,
        default: '',
        trim: true
    },
    nontbb: {
        type: String,
        default: '',
        trim: true
    },
    nontbc: {
        type: String,
        default: '',
        trim: true
    },
    nontbd: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_pengobatan"
    }
});

PengobatanSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Pengobatan', PengobatanSchema);
