'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('./pasien.model');
var Anamnesa = require('../anamnesa/anamnesa.model');
var Fisikdiagnostik = require('../fisikdiagnostik/fisikdiagnostik.model');

// Get list of pasiens
exports.index = function (req, res) {
    var pasienObj = {};

    async.series([

        function (callback) {
            Pasien.find({}).populate('_anamnesa').exec(function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                pasienObj = pasien;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pasienObj);
    });
};

// Get a single pasien
exports.show = function (req, res) {
    var pasienObj = {};

    async.series([

        function (callback) {
            Pasien.findById(req.params.id, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                pasienObj = pasien;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pasienObj);
    });
};

// Creates a new pasien in the DB.
exports.create = function (req, res) {
    var pasienObj = {};

    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Pasien.findOne({
                nomor: req.body.nomor
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                } else if (pasien) {
                    pasienObj = {
                        error: 'Nomor Pasien "' + pasien.nomor + '" sudah terdaftar di database. Silahkan input Nomor Pasien yang lain'
                    }
                    callback();
                } else if (!pasien) {
                    Pasien.create(req.body, function (err, pasien) {
                        if (err) {
                            return callback(err);
                        }
                        pasienObj = pasien;
                        callback();
                    });
                }
            });
        },
        function (callback) {
            Anamnesa.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Fisikdiagnostik.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pasienObj);
    });
};

// Updates an existing pasien in the DB.
exports.update = function (req, res) {
    var pasienObj = {};

    req.body.updated = Date.now();
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Pasien.findById(req.params.id, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(pasien, req.body);
                updated.save(function (data) {
                    callback();
                });
                pasienObj = pasien;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pasienObj);
    });
};

// Deletes a pasien from the DB.
exports.destroy = function (req, res) {
    Pasien.findById(req.params.id, function (err, pasien) {
        if (err) {
            return handleError(res, err);
        }
        if (!pasien) {
            return res.send(404);
        }
        pasien.remove(function (err) {
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
