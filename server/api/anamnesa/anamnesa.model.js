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