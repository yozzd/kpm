/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Diagnosa = require('./diagnosa.model');

exports.register = function (socket) {
    Diagnosa.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    Diagnosa.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('diagnosa:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('diagnosa:remove', doc);
}
