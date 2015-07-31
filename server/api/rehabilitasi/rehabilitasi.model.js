'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var RehabilitasiSchema = new Schema({
    rehab: [{
        type: String,
        default: '',
        trim: true
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_rehabilitasi"
    }
});

RehabilitasiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Rehabilitasi', RehabilitasiSchema);
