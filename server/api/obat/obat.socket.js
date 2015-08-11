/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Obat = require('./obat.model');

exports.register = function (socket) {
    Obat.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Obat.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('obat:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('obat:remove', doc);
}
