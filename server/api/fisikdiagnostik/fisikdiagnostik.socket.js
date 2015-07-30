/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var FisikDiagnostik = require('./fisikdiagnostik.model');

exports.register = function (socket) {
    FisikDiagnostik.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    FisikDiagnostik.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('fisikdiagnostik:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('fisikdiagnostik:remove', doc);
}
