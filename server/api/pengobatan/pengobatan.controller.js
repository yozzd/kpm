'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Pengobatan = require('./pengobatan.model');

// Get a single pengobatan
exports.show = function (req, res) {
    var pengobatanObj = {};

    async.series([

        function (callback) {
            Pengobatan.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, pengobatan) {
                if (err) {
                    return callback(err);
                }
                pengobatanObj = pengobatan;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pengobatanObj);
    });
};


// Updates an existing pengobatan in the DB.
exports.update = function (req, res) {
    var pengobatanObj = {};

    async.series([

        function (callback) {
            Pengobatan.findById(req.params.id, function (err, pengobatan) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(pengobatan, req.body);
                updated.save(function (data) {
                    callback();
                });
                pengobatanObj = pengobatan;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(pengobatanObj._pasien, function (err, pengobatan) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(pengobatan, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pengobatanObj);
    });
};

// Deletes a pengobatan from the DB.
exports.destroy = function (req, res) {
    Pengobatan.findById(req.params.id, function (err, pengobatan) {
        if (err) {
            return handleError(res, err);
        }
        if (!pengobatan) {
            return res.send(404);
        }
        pengobatan.remove(function (err) {
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
