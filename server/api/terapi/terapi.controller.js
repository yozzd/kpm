'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Terapi = require('./terapi.model');

// Get a single terapi
exports.show = function (req, res) {
    var terapiObj = {};

    async.series([

        function (callback) {
            Terapi.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, terapi) {
                if (err) {
                    return callback(err);
                }
                terapiObj = terapi;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(terapiObj);
    });
};

// Updates an existing terapi in the DB.
exports.update = function (req, res) {
    var terapiObj = {};

    async.series([

        function (callback) {
            Terapi.findById(req.params.id, function (err, terapi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(terapi, req.body);
                updated.save(function (data) {
                    callback();
                });
                terapiObj = terapi;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(terapiObj._pasien, function (err, terapi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(terapi, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(terapiObj);
    });
};

// Deletes a terapi from the DB.
exports.destroy = function (req, res) {
    Terapi.findById(req.params.id, function (err, terapi) {
        if (err) {
            return handleError(res, err);
        }
        if (!terapi) {
            return res.send(404);
        }
        terapi.remove(function (err) {
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
