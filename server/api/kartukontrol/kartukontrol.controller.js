'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra')

var Pasien = require('../pasien/pasien.model');
var KartuKontrol = require('./kartukontrol.model');

function base64_encode(file) {
    var bitmap = fse.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fse.writeFileSync(file, bitmap);
}

// Get list of kartukontrols
exports.index = function (req, res) {
    KartuKontrol.find(function (err, kartukontrols) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, kartukontrols);
    });
};

// Get a single kartukontrol
exports.show = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrolObj = kartukontrol;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

// Creates a new kartukontrol in the DB.
exports.create = function (req, res) {
    console.log(req.files.length);
};

exports.files = function (req, res) {
    var kartukontrolObj = {};
    var file = req.files.file;

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                if (file === undefined) {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        image: kartukontrol.image === '' ? '' : kartukontrol.image,
                        imagename: kartukontrol.imagename === '' ? '' : kartukontrol.imagename,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi
                    });
                    kartukontrol.save(function (data) {
                        callback();
                    });
                } else {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        image: 'data:' + file.type + ';base64,' + base64_encode(file.path),
                        imagename: file.name,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi
                    });
                    kartukontrol.save(function (data) {
                        callback();
                    });
                }
                kartukontrolObj = kartukontrol;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(kartukontrolObj._pasien, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(kartukontrol, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

// Updates an existing kartukontrol in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
        if (err) {
            return handleError(res, err);
        }
        if (!kartukontrol) {
            return res.send(404);
        }
        var updated = _.merge(kartukontrol, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, kartukontrol);
        });
    });
};

// Deletes a kartukontrol from the DB.
exports.destroy = function (req, res) {
    KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
        if (err) {
            return handleError(res, err);
        }
        if (!kartukontrol) {
            return res.send(404);
        }
        kartukontrol.remove(function (err) {
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
