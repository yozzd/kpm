'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var TerapiSchema = new Schema({
    nebulizer: {
        type: String,
        default: '',
        trim: true
    },
    punctie: {
        type: String,
        default: '',
        trim: true
    },
    subpunctie: {
        type: String,
        default: '',
        trim: true
    },
    wsd: {
        type: String,
        default: '',
        trim: true
    },
    pleurodesis: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_terapi"
    }
});

TerapiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Terapi', TerapiSchema);
