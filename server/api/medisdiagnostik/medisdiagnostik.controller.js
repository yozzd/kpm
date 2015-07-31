'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var MedisDiagnostik = require('./medisdiagnostik.model');

// Get a single medisdiagnostik
exports.show = function (req, res) {
    var medisdiagnostikObj = {};

    async.series([

        function (callback) {
            MedisDiagnostik.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, medisdiagnostik) {
                if (err) {
                    return callback(err);
                }
                medisdiagnostikObj = medisdiagnostik;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(medisdiagnostikObj);
    });
};

// Updates an existing medisdiagnostik in the DB.
exports.update = function (req, res) {
    var medisdiagnostikObj = {};

    async.series([

        function (callback) {
            MedisDiagnostik.findById(req.params.id, function (err, medisdiagnostik) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(medisdiagnostik, req.body);
                updated.save(function (data) {
                    callback();
                });
                medisdiagnostikObj = medisdiagnostik;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(medisdiagnostikObj._pasien, function (err, medisdiagnostik) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(medisdiagnostik, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(medisdiagnostikObj);
    });
};

// Deletes a medisdiagnostik from the DB.
exports.destroy = function (req, res) {
    MedisDiagnostik.findById(req.params.id, function (err, medisdiagnostik) {
        if (err) {
            return handleError(res, err);
        }
        if (!medisdiagnostik) {
            return res.send(404);
        }
        medisdiagnostik.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
