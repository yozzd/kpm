/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Konsultasi = require('./konsultasi.model');

exports.register = function (socket) {
    Konsultasi.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Konsultasi.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('konsultasi:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('konsultasi:remove', doc);
}
