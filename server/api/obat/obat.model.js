'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ObatSchema = new Schema({
    bulan: {
        type: String,
        default: '',
        trim: true
    },
    tahun: {
        type: String,
        default: '',
        trim: true
    },
    obat: {
        type: String,
        default: '',
        trim: true
    },
    satuan: {
        type: String,
        default: '',
        trim: true
    },
    pindahan: {
        type: Number,
        default: 0,
        trim: true
    },
    masuk: {
        type: Number,
        default: 0,
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
