'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObatSchema = new Schema({
    nama: {
        type: String,
        default: '',
        trim: true
    },
    satuan: {
        type: String,
        default: '',
        trim: true
    },
    created: {
        type: Date,
        default: '',
        trim: true
    },
    updated: {
        type: Date,
        default: '',
        trim: true
    },
    by: {
        type: String,
        default: '',
        trim: true
    }
});

module.exports = mongoose.model('Obat', ObatSchema);
