/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rehabilitasi = require('./rehabilitasi.model');

exports.register = function (socket) {
    Rehabilitasi.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Rehabilitasi.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('rehabilitasi:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('rehabilitasi:remove', doc);
}
