'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var AnamnesaSchema = new Schema({
    batuk: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lamabatuk: {
        type: String,
        default: '',
        trim: true
    },
    intensitasbatuk: {
        type: String,
        default: '',
        trim: true
    },
    frekuensibatuk: {
        type: String,
        default: '',
        trim: true
    },
    batukdarah: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lamabatukdarah: {
        type: String,
        default: '',
        trim: true
    },
    intensitasbatukdarah: {
        type: String,
        default: '',
        trim: true
    },
    volumebatukdarah: {
        type: String,
        default: '',
        trim: true
    },
    sesak: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lamasesak: {
        type: String,
        default: '',
        trim: true
    },
    sifatsesak: {
        type: String,
        default: '',
        trim: true
    },
    intensitassesak: {
        type: String,
        default: '',
        trim: true
    },
    frekuensisesak: {
        type: String,
        default: '',
        trim: true
    },
    mengisesak: {
        type: String,
        default: '',
        trim: true
    },
    bertambahsesak: {
        type: String,
        default: '',
        trim: true
    },
    pencetussesak: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_anamnesa"
    },
});

AnamnesaSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Anamnesa', AnamnesaSchema);
