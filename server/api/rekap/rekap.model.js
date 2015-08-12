'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RekapSchema = new Schema({
    bulan: {
        type: Number,
        default: '',
        trim: true
    },
    tahun: {
        type: Number,
        default: '',
        trim: true
    },
    oid: {
        type: String,
        default: '',
        trim: true
    },
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
    keluar: {
        type: Number,
        default: 0,
        trim: true
    },
    sisa: {
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

module.exports = mongoose.model('Rekap', RekapSchema);
