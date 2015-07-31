/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Laboratorium = require('./laboratorium.model');

exports.register = function (socket) {
    Laboratorium.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Laboratorium.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('laboratorium:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('laboratorium:remove', doc);
}
