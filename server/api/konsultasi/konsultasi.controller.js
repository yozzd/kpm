'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Konsultasi = require('./konsultasi.model');

// Get a single konsultasi
exports.show = function (req, res) {
    var konsultasiObj = {};

    async.series([

        function (callback) {
            Konsultasi.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, konsultasi) {
                if (err) {
                    return callback(err);
                }
                konsultasiObj = konsultasi;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(konsultasiObj);
    });
};

// Updates an existing konsultasi in the DB.
exports.update = function (req, res) {
    var konsultasiObj = {};

    async.series([

        function (callback) {
            Konsultasi.update({
                _id: req.params.id
            }, {
                $set: {
                    konsul: ''
                }
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Konsultasi.findById(req.params.id, function (err, konsultasi) {
                if (err) {
                    return callback(err);
                }
                if ((req.body.konsul).length < 1) {
                    req.body.konsul = null;
                    var update = _.merge(konsultasi, req.body);
                    update.save(function (data) {
                        callback();
                    });
                } else {
                    var updated = _.merge(konsultasi, req.body);
                    updated.save(function (data) {
                        callback();
                    });
                }
                konsultasiObj = konsultasi;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(konsultasiObj._pasien, function (err, konsultasi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(konsultasi, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(konsultasiObj);
    });
};

// Deletes a konsultasi from the DB.
exports.destroy = function (req, res) {
    Konsultasi.findById(req.params.id, function (err, konsultasi) {
        if (err) {
            return handleError(res, err);
        }
        if (!konsultasi) {
            return res.send(404);
        }
        konsultasi.remove(function (err) {
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
