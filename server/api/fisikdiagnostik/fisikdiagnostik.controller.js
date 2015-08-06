'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var FisikDiagnostik = require('./fisikdiagnostik.model');
var KartuKontrol = require('../kartukontrol/kartukontrol.model');

// Get a single fisikdiagnostik
exports.show = function (req, res) {
    var fisikdiagnostikObj = {};

    async.series([

        function (callback) {
            FisikDiagnostik.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, fisikdiagnostik) {
                if (err) {
                    return callback(err);
                }
                fisikdiagnostikObj = fisikdiagnostik;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(fisikdiagnostikObj);
    });
};

// Updates an existing fisikdiagnostik in the DB.
exports.update = function (req, res) {
    var fisikdiagnostikObj = {};
    var pasienObj = {};

    async.series([

        function (callback) {
            FisikDiagnostik.findById(req.params.id, function (err, fisikdiagnostik) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(fisikdiagnostik, req.body);
                updated.save(function (data) {
                    callback();
                });
                fisikdiagnostikObj = fisikdiagnostik;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(fisikdiagnostikObj._pasien, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(pasien, req.body);
                updated.save(function (data) {
                    callback();
                });
                pasienObj = pasien;
            });
        },
        function (callback) {
            KartuKontrol.findOne({
                _pasien: pasienObj._id
            }, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrol.kontrol[0].tinggi = req.body.tinggi;
                kartukontrol.kontrol[0].berat = req.body.berat;
                kartukontrol.save(function () {
                    callback();
                })
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(fisikdiagnostikObj);
    });
};

// Deletes a fisikdiagnostik from the DB.
exports.destroy = function (req, res) {
    FisikDiagnostik.findById(req.params.id, function (err, fisikdiagnostik) {
        if (err) {
            return handleError(res, err);
        }
        if (!fisikdiagnostik) {
            return res.send(404);
        }
        fisikdiagnostik.remove(function (err) {
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
