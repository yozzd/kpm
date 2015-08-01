'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var KonsultasiSchema = new Schema({
    konsul: [{
        type: String,
        default: '',
        trim: true
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_konsultasi"
    }
});

KonsultasiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Konsultasi', KonsultasiSchema);
