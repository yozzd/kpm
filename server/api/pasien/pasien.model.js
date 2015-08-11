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
    satuanumur: {
        type: String,
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
    _fisikdiagnostik: {
        type: Schema.Types.ObjectId,
        ref: 'FisikDiagnostik'
    },
    _radiologi: {
        type: Schema.Types.ObjectId,
        ref: 'Radiologi'
    },
    _laboratorium: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorium'
    },
    _medisdiagnostik: {
        type: Schema.Types.ObjectId,
        ref: 'MedisDiagnostik'
    },
    _diagnosa: {
        type: Schema.Types.ObjectId,
        ref: 'Diagnosa'
    },
    _pengobatan: {
        type: Schema.Types.ObjectId,
        ref: 'Pengobatan'
    },
    _terapi: {
        type: Schema.Types.ObjectId,
        ref: 'Terapi'
    },
    _rehabilitasi: {
        type: Schema.Types.ObjectId,
        ref: 'Rehabilitasi'
    },
    _konsultasi: {
        type: Schema.Types.ObjectId,
        ref: 'Konsultasi'
    },
    _usul: {
        type: Schema.Types.ObjectId,
        ref: 'Usul'
    },
    _kartukontrol: {
        type: Schema.Types.ObjectId,
        ref: 'KartuKontrol'
    },
    _resep: {
        type: Schema.Types.ObjectId,
        ref: 'Resep'
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
