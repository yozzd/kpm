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
    dahak: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    volumedahak: {
        type: String,
        default: '',
        trim: true
    },
    warnadahak: {
        type: String,
        default: '',
        trim: true
    },
    konsistensidahak: {
        type: String,
        default: '',
        trim: true
    },
    nyeridada: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lokasinyeridada: {
        type: String,
        default: '',
        trim: true
    },
    demam: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lamademam: {
        type: String,
        default: '',
        trim: true
    },
    pagisiangdemam: {
        type: String,
        default: '',
        trim: true
    },
    soredemam: {
        type: String,
        default: '',
        trim: true
    },
    malamdemam: {
        type: String,
        default: '',
        trim: true
    },
    keringat: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    nafsu: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lemah: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    lain: {
        type: String,
        default: '',
        trim: true
    },
    penyakit: {
        type: String,
        default: '',
        trim: true
    },
    pengobatan: {
        type: String,
        default: '',
        trim: true
    },
    lamamerokok: {
        type: String,
        default: '',
        trim: true
    },
    banyakrokok: {
        type: String,
        default: '',
        trim: true
    },
    jenisobat: {
        type: String,
        default: '',
        trim: true
    },
    lamaobat: {
        type: String,
        default: '',
        trim: true
    },
    jenisalkohol: {
        type: String,
        default: '',
        trim: true
    },
    lamaalkohol: {
        type: String,
        default: '',
        trim: true
    },
    tbcparu: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    tbcparuya: {
        type: String,
        default: '',
        trim: true
    },
    asma: {
        type: String,
        default: 'Tidak',
        trim: true
    },
    asmaya: {
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
