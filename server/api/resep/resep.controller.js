'use strict';

var _ = require('lodash');
var Resep = require('./resep.model');

// Get list of reseps
exports.index = function(req, res) {
  Resep.find(function (err, reseps) {
    if(err) { return handleError(res, err); }
    return res.json(200, reseps);
  });
};

// Get a single resep
exports.show = function(req, res) {
  Resep.findById(req.params.id, function (err, resep) {
    if(err) { return handleError(res, err); }
    if(!resep) { return res.send(404); }
    return res.json(resep);
  });
};

// Creates a new resep in the DB.
exports.create = function(req, res) {
  Resep.create(req.body, function(err, resep) {
    if(err) { return handleError(res, err); }
    return res.json(201, resep);
  });
};

// Updates an existing resep in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Resep.findById(req.params.id, function (err, resep) {
    if (err) { return handleError(res, err); }
    if(!resep) { return res.send(404); }
    var updated = _.merge(resep, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, resep);
    });
  });
};

// Deletes a resep from the DB.
exports.destroy = function(req, res) {
  Resep.findById(req.params.id, function (err, resep) {
    if(err) { return handleError(res, err); }
    if(!resep) { return res.send(404); }
    resep.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}