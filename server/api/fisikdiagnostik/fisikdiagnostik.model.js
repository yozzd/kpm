'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var FisikDiagnostikSchema = new Schema({
    keadaan: {
        type: String,
        default: '',
        trim: true
    },
    kesadaran: {
        type: String,
        default: '',
        trim: true
    },
    frekuensi: {
        type: String,
        default: '',
        trim: true
    },
    nadi: {
        type: String,
        default: '',
        trim: true
    },
    suhu: {
        type: String,
        default: '',
        trim: true
    },
    dispnoe: {
        type: String,
        default: '',
        trim: true
    },
    orthopnoe: {
        type: String,
        default: '',
        trim: true
    },
    odem: {
        type: String,
        default: '',
        trim: true
    },
    lain: {
        type: String,
        default: '',
        trim: true
    },
    inspeksi: {
        type: String,
        default: '',
        trim: true
    },
    palpasi: {
        type: String,
        default: '',
        trim: true
    },
    perkusi: {
        type: String,
        default: '',
        trim: true
    },
    auskultasi: {
        type: String,
        default: '',
        trim: true
    },
    hr: {
        type: String,
        default: '',
        trim: true
    },
    st: {
        type: String,
        default: '',
        trim: true
    },
    abdomen: {
        type: String,
        default: '',
        trim: true
    },
    hepar: {
        type: String,
        default: '',
        trim: true
    },
    limpa: {
        type: String,
        default: '',
        trim: true
    },
    extrimitas: {
        type: String,
        default: '',
        trim: true
    },
    anemis: {
        type: String,
        default: '',
        trim: true
    },
    sianisis: {
        type: String,
        default: '',
        trim: true
    },
    ikhterus: {
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
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_fisikdiagnostik"
    }
});

FisikDiagnostikSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('FisikDiagnostik', FisikDiagnostikSchema);
