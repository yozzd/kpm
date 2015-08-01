/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Usul = require('./usul.model');

exports.register = function (socket) {
    Usul.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Usul.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('usul:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('usul:remove', doc);
}
