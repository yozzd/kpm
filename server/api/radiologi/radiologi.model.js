'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var RadiologiSchema = new Schema({
    image: {
        type: String,
        default: '',
        trim: true
    },
    imagename: {
        type: String,
        default: '',
        trim: true
    },
    contenttype: {
        type: String,
        default: '',
        trim: true
    },
    thorakpatgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakpahasil: {
        type: String,
        default: '',
        trim: true
    },
    thorakcttgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakcthasil: {
        type: String,
        default: '',
        trim: true
    },
    thorakusgtgl: {
        type: Date,
        default: '',
        trim: true
    },
    thorakusghasil: {
        type: String,
        default: '',
        trim: true
    },
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_radiologi"
    }
});

RadiologiSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Radiologi', RadiologiSchema);
