'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Diagnosa = require('./diagnosa.model');

// Get a single diagnosa
exports.show = function (req, res) {
    var diagnosaObj = {};

    async.series([

        function (callback) {
            Diagnosa.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, diagnosa) {
                if (err) {
                    return callback(err);
                }
                diagnosaObj = diagnosa;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(diagnosaObj);
    });
};

// Updates an existing diagnosa in the DB.
exports.update = function (req, res) {
    var diagnosaObj = {};

    async.series([

        function (callback) {
            Diagnosa.findById(req.params.id, function (err, diagnosa) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(diagnosa, req.body);
                updated.save(function (data) {
                    callback();
                });
                diagnosaObj = diagnosa;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(diagnosaObj._pasien, function (err, diagnosa) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(diagnosa, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(diagnosaObj);
    });
};

// Deletes a diagnosa from the DB.
exports.destroy = function (req, res) {
    Diagnosa.findById(req.params.id, function (err, diagnosa) {
        if (err) {
            return handleError(res, err);
        }
        if (!diagnosa) {
            return res.send(404);
        }
        diagnosa.remove(function (err) {
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
