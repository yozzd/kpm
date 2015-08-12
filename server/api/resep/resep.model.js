'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var ResepSchema = new Schema({
    reseps: [{
        tanggal: {
            type: Date,
            default: '',
            trim: true
        },
        bulan: {
            type: String,
            default: '',
            trim: true
        },
        tahun: {
            type: String,
            default: '',
            trim: true
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
    }],
    _pasien: {
        type: Schema.Types.ObjectId,
        ref: 'Pasien',
        childPath: "_resep"
    }
});

ResepSchema.plugin(relationship, {
    relationshipPathName: '_pasien'
});


module.exports = mongoose.model('Resep', ResepSchema);
