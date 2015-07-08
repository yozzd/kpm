'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PasienSchema = new Schema({
    nomor: {
        type: String,
        default: '',
        trim: true
    },
    tanggal: {
        type: Date,
        default: '',
        trim: true
    },
    nama: {
        type: String,
        default: '',
        trim: true
    },
    umur: {
        type: Number,
        default: '',
        trim: true
    },
    jeniskelamin: {
        type: String,
        default: '',
        trim: true
    },
    jalan: {
        type: String,
        default: '',
        trim: true
    },
    lingkungan: {
        type: String,
        default: '',
        trim: true
    },
    kelkec: {
        type: String,
        default: '',
        trim: true
    },
    kotkab: {
        type: String,
        default: '',
        trim: true
    },
    provinsi: {
        type: String,
        default: '',
        trim: true
    },
    telp: {
        type: String,
        default: '',
        trim: true
    },
    suku: {
        type: String,
        default: '',
        trim: true
    },
    agama: {
        type: String,
        default: '',
        trim: true
    },
    pekerjaan: {
        type: String,
        default: '',
        trim: true
    },
    statuskeluarga: {
        type: String,
        default: '',
        trim: true
    },
    dikirim: {
        type: String,
        default: '',
        trim: true
    },
    kdikirim: {
        type: String,
        default: '',
        trim: true
    },
    pembiayaan: {
        type: String,
        default: '',
        trim: true
    },
    kpembiayaan: {
        type: String,
        default: '',
        trim: true
    },
    _anamnesa: {
        type: Schema.Types.ObjectId,
        ref: 'Anamnesa'
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

module.exports = mongoose.model('Pasien', PasienSchema);
