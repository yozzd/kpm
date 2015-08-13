'use strict';

var _ = require('lodash');
var async = require('async');

var Resep = require('./resep.model');

// Get list of reseps
exports.index = function (req, res) {
    var resepObj = {};

    async.series([

        function (callback) {
            Resep.find({}).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Get a single resep
exports.show = function (req, res) {
    Resep.findById(req.params.id, function (err, resep) {
        if (err) {
            return handleError(res, err);
        }
        if (!resep) {
            return res.send(404);
        }
        return res.json(resep);
    });
};

exports.detail = function (req, res) {
    var resepObj = {};

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                var match = [];
                var filter = _.filter(resep.lists, function (value) {
                    return value._id.toString() === req.params.lid;
                });
                match.push({
                    tanggal: filter[0].tanggal,
                    bulan: filter[0].bulan,
                    tahun: filter[0].tahun,
                    items: filter[0].items,
                    nama: resep._pasien.nama,
                    umur: resep._pasien.umur,
                    satuanumur: resep._pasien.satuanumur,
                    jeniskelamin: resep._pasien.jeniskelamin,
                });
                resepObj = match;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Creates a new resep in the DB.
exports.create = function (req, res) {
    var resepObj = {};

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.create(req.body, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Updates an existing resep in the DB.
exports.update = function (req, res) {
    var resepObj = {};

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resep.lists.push({
                    tanggal: req.body.tanggal,
                    bulan: req.body.bulan,
                    tahun: req.body.tahun,
                    items: req.body.arr,
                    created: req.body.created,
                    updated: req.body.updated,
                    by: req.body.by,
                })
                resep.save(function (data) {
                    callback();
                });
                resepObj = resep;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Deletes a resep from the DB.
exports.destroy = function (req, res) {
    Resep.findById(req.params.id, function (err, resep) {
        if (err) {
            return handleError(res, err);
        }
        if (!resep) {
            return res.send(404);
        }
        resep.remove(function (err) {
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
