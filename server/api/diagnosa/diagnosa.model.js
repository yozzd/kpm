'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var DiagnosaSchema = new Schema({
    primer: {
        type: String,
        default: '',
        trim: true
    },
    keterangan: {
        type: String,
        default: '',
        trim: true
    },
    sekunder: [{
        _id: {
            type: Schema.Types.ObjectId
        },
        opsi: {
            type: String,
            default: '',
            trim: true
        }
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_diagnosa"
    }
});

DiagnosaSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});

module.exports = mongoose.model('Diagnosa', DiagnosaSchema);
