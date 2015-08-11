'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var ResepSchema = new Schema({
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
