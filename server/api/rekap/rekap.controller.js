'use strict';

var _ = require('lodash');
var async = require('async');

var Rekap = require('./rekap.model');

// Get list of rekaps
exports.index = function (req, res) {
    var rekapObj = {};

    async.series([

        function (callback) {
            Rekap.find({}, function (err, rekap) {
                if (err) {
                    return callback(err);
                }
                rekapObj = rekap;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rekapObj);
    });
};

// Get a single rekap
exports.show = function (req, res) {
    var rekapObj = {};

    async.series([

        function (callback) {
            Rekap.findById(req.params.id, function (err, rekap) {
                if (err) {
                    return callback(err);
                }
                rekapObj = rekap;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rekapObj);
    });
};

// Creates a new rekap in the DB.
exports.create = function (req, res) {
    var rekapObj = {};

    req.body.oid = req.body.obat._id;
    req.body.nama = req.body.obat.nama;
    req.body.satuan = req.body.obat.satuan;
    req.body.sisa = parseInt(req.body.pindahan) + parseInt(req.body.masuk);
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Rekap.create(req.body, function (err, rekap) {
                if (err) {
                    return callback(err);
                }
                rekapObj = rekap;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rekapObj);
    });
};

// Updates an existing rekap in the DB.
exports.update = function (req, res) {
    var rekapObj = {};

    req.body.oid = req.body.obat._id;
    req.body.nama = req.body.obat.nama;
    req.body.satuan = req.body.obat.satuan;
    req.body.sisa = parseInt(req.body.pindahan) + parseInt(req.body.masuk);
    req.body.updated = Date.now();
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Rekap.findById(req.params.id, function (err, rekap) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(rekap, req.body);
                updated.save(function (data) {
                    callback();
                });
                rekapObj = rekap;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rekapObj);
    });
};

// Deletes a rekap from the DB.
exports.destroy = function (req, res) {
    var rekapObj = {};

    async.series([
        function (callback) {
            Rekap.findById(req.params.id, function (err, rekap) {
                if (err) {
                    return callback(err);
                }
                rekap.remove(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rekapObj);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
