/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Pengobatan = require('./pengobatan.model');

exports.register = function (socket) {
    Pengobatan.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Pengobatan.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('pengobatan:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('pengobatan:remove', doc);
}
