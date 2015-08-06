'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra');

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

// Get list of pasiens
exports.index = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.find({}).populate('_pasien').exec(function (err, kartukontrol) {
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

exports.files = function (req, res) {
    var kartukontrolObj = {};
    var file = req.files.file;
    var dt = req.body.tanggal;
    var date = new Date(dt);

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                if (file === undefined) {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        bulan: date.getMonth(),
                        tahun: date.getFullYear(),
                        image: kartukontrol.image === '' ? '' : kartukontrol.image,
                        imagename: kartukontrol.imagename === '' ? '' : kartukontrol.imagename,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        did: req.body.did,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi,
                        status: 'L'
                    });
                    kartukontrol.save(function (data) {
                        callback();
                    });
                } else {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        bulan: date.getMonth(),
                        tahun: date.getFullYear(),
                        image: 'data:' + file.type + ';base64,' + base64_encode(file.path),
                        imagename: file.name,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        did: req.body.did,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi,
                        status: 'L'
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
    var kartukontrolObj = {};
    var file = req.files.file;
    var dt = req.body.tanggal;
    var date = new Date(dt);

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var index = _.findIndex(kartukontrol.kontrol, function (chr) {
                    return chr._id.toString() === req.body.id;
                });
                if (file === undefined) {
                    kartukontrol.kontrol[index].tanggal = req.body.tanggal;
                    kartukontrol.kontrol[index].bulan = date.getMonth();
                    kartukontrol.kontrol[index].tahun = date.getFullYear();
                    kartukontrol.kontrol[index].image = kartukontrol.image === '' ? '' : kartukontrol.image;
                    kartukontrol.kontrol[index].imagename = kartukontrol.imagename === '' ? '' : kartukontrol.imagename;
                    kartukontrol.kontrol[index].keluhan = req.body.keluhan;
                    kartukontrol.kontrol[index].lab = req.body.lab;
                    kartukontrol.kontrol[index].sputum = req.body.sputum;
                    kartukontrol.kontrol[index].mt = req.body.mt;
                    kartukontrol.kontrol[index].berat = req.body.berat;
                    kartukontrol.kontrol[index].tinggi = req.body.tinggi;
                    kartukontrol.kontrol[index].did = req.body.did;
                    kartukontrol.kontrol[index].diagnosa = req.body.diagnosa;
                    kartukontrol.kontrol[index].terapi = req.body.terapi;
                    kartukontrol.kontrol[index].status = 'L';
                    kartukontrol.save(function (data) {
                        callback();
                    });
                } else {
                    kartukontrol.kontrol[index].tanggal = req.body.tanggal;
                    kartukontrol.kontrol[index].bulan = date.getMonth();
                    kartukontrol.kontrol[index].tahun = date.getFullYear();
                    kartukontrol.kontrol[index].image = 'data:' + file.type + ';base64,' + base64_encode(file.path);
                    kartukontrol.kontrol[index].imagename = file.name;
                    kartukontrol.kontrol[index].keluhan = req.body.keluhan;
                    kartukontrol.kontrol[index].lab = req.body.lab;
                    kartukontrol.kontrol[index].sputum = req.body.sputum;
                    kartukontrol.kontrol[index].mt = req.body.mt;
                    kartukontrol.kontrol[index].berat = req.body.berat;
                    kartukontrol.kontrol[index].tinggi = req.body.tinggi;
                    kartukontrol.kontrol[index].did = req.body.did;
                    kartukontrol.kontrol[index].diagnosa = req.body.diagnosa;
                    kartukontrol.kontrol[index].terapi = req.body.terapi;
                    kartukontrol.kontrol[index].status = 'L';
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

exports.rem = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrol.kontrol.pull(req.body.id)
                kartukontrol.save(function (data) {
                    callback();
                });
                kartukontrolObj = kartukontrol;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
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
