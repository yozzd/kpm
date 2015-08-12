/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Rekap = require('./rekap.model');

exports.register = function (socket) {
    Rekap.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Rekap.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('rekap:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('rekap:remove', doc);
}
