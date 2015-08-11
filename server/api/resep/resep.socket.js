/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Resep = require('./resep.model');

exports.register = function (socket) {
    Resep.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Resep.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('resep:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('resep:remove', doc);
}
