'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var KartuKontrolSchema = new Schema({
    kontrol: [{
        tanggal: {
            type: Date,
            default: '',
            trim: true
        },
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
        image: {
            type: String,
            default: '',
            trim: true
        },
        imagename: {
            type: String,
            default: '',
            trim: true
        },
        keluhan: {
            type: String,
            default: '',
            trim: true
        },
        lab: {
            type: String,
            default: '',
            trim: true
        },
        sputum: {
            type: String,
            default: '',
            trim: true
        },
        mt: {
            type: String,
            default: '',
            trim: true
        },
        berat: {
            type: String,
            default: '',
            trim: true
        },
        tinggi: {
            type: String,
            default: '',
            trim: true
        },
        did: {
            type: String,
            default: '',
            trim: true
        },
        diagnosa: {
            type: String,
            default: '',
            trim: true
        },
        terapi: {
            type: String,
            default: '',
            trim: true
        },
        status: {
            type: String,
            default: '',
            trim: true
        }
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_kartukontrol"
    }
});

KartuKontrolSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('KartuKontrol', KartuKontrolSchema);
