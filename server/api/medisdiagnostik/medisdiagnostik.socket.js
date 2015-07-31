/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MedisDiagnostik = require('./medisdiagnostik.model');

exports.register = function (socket) {
    MedisDiagnostik.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    MedisDiagnostik.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('medisdiagnostik:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('medisdiagnostik:remove', doc);
}
