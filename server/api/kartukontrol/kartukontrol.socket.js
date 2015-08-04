/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var KartuKontrol = require('./kartukontrol.model');

exports.register = function (socket) {
    KartuKontrol.schema.post('save', function (doc) {
        onSave(socket, doc);
    });
    KartuKontrol.schema.post('remove', function (doc) {
        onRemove(socket, doc);
    });
}

function onSave(socket, doc, cb) {
    socket.emit('kartukontrol:save', doc);
}

function onRemove(socket, doc, cb) {
    socket.emit('kartukontrol:remove', doc);
}
