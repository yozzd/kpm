/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var OpsiDiagnosa = require('./opsidiagnosa.model');

exports.register = function (socket) {
    OpsiDiagnosa.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    OpsiDiagnosa.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('opsidiagnosa:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('opsidiagnosa:remove', doc);
}
