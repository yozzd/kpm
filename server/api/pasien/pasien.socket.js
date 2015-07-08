/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pasien = require('./pasien.model');

exports.register = function (socket) {
    Pasien.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Pasien.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('pasien:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('pasien:remove', doc);
}