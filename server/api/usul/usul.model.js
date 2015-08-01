'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var UsulSchema = new Schema({
    usulans: [{
        usulan: {
            type: String,
            default: '',
            trim: true
        }
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_usul"
    }
});

UsulSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Usul', UsulSchema);
