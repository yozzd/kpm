/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Anamnesa = require('./anamnesa.model');

exports.register = function(socket) {
  Anamnesa.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Anamnesa.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('anamnesa:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('anamnesa:remove', doc);
}