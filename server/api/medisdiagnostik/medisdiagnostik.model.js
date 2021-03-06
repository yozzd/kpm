'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var MedisDiagnostikSchema = new Schema({
    bronkhoskopitgl: {
        type: Date,
        default: '',
        trim: true
    },
    bronkhoskopihasil: {
        type: String,
        default: '',
        trim: true
    },
    spirometertgl: {
        type: Date,
        default: '',
        trim: true
    },
    evc: {
        type: String,
        default: '',
        trim: true
    },
    fvc: {
        type: String,
        default: '',
        trim: true
    },
    fevi: {
        type: String,
        default: '',
        trim: true
    },
    persenfvc: {
        type: String,
        default: '',
        trim: true
    },
    persenfevi: {
        type: String,
        default: '',
        trim: true
    },
    kesimpulan: {
        type: String,
        default: '',
        trim: true
    },
    subkesimpulan: {
        type: String,
        default: '',
        trim: true
    },
    pefrtgl: {
        type: Date,
        default: '',
        trim: true
    },
    pefr: {
        type: String,
        default: '',
        trim: true
    },
    bronkhodilatortgl: {
        type: Date,
        default: '',
        trim: true
    },
    bronkhodilator: {
        type: String,
        default: '',
        trim: true
    },
    bronkhustgl: {
        type: Date,
        default: '',
        trim: true
    },
    bronkhus: {
        type: String,
        default: '',
        trim: true
    },
    subbronkhus: {
        type: String,
        default: '',
        trim: true
    },
    ekgtgl: {
        type: Date,
        default: '',
        trim: true
    },
    ekghasil: {
        type: String,
        default: '',
        trim: true
    },
    treadmilltgl: {
        type: Date,
        default: '',
        trim: true
    },
    treadmillhasil: {
        type: String,
        default: '',
        trim: true
    },
    lge: {
        type: String,
        default: '',
        trim: true
    },
    skin: {
        type: String,
        default: '',
        trim: true
    },
    subskin: {
        type: String,
        default: '',
        trim: true
    },
    tuberkulin: {
        type: String,
        default: '',
        trim: true
    },
    pleuratgl: {
        type: Date,
        default: '',
        trim: true
    },
    pleurahasil: {
        type: String,
        default: '',
        trim: true
    },
    histolitgl: {
        type: Date,
        default: '',
        trim: true
    },
    histolilokasi: {
        type: String,
        default: '',
        trim: true
    },
    histolibahan: {
        type: String,
        default: '',
        trim: true
    },
    histolihasil: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_medisdiagnostik"
    }
});

MedisDiagnostikSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('MedisDiagnostik', MedisDiagnostikSchema);
