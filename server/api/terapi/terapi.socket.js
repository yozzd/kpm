/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Terapi = require('./terapi.model');

exports.register = function (socket) {
    Terapi.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Terapi.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('terapi:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('terapi:remove', doc);
}
