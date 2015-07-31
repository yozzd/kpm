/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Radiologi = require('./radiologi.model');

exports.register = function (socket) {
    Radiologi.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Radiologi.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('radiologi:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('radiologi:remove', doc);
}
