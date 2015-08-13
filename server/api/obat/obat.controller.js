'use strict';

var _ = require('lodash');
var async = require('async');

var Obat = require('./obat.model');

// Get list of obats
exports.index = function (req, res) {
    var obatObj = {};

    async.series([

        function (callback) {
            Obat.find({}, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                obatObj = obat;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(obatObj);
    });
};

// Get a single obat
exports.show = function (req, res) {
    Obat.findById(req.params.id, function (err, obat) {
        if (err) {
            return handleError(res, err);
        }
        if (!obat) {
            return res.send(404);
        }
        return res.json(obat);
    });
};

// Creates a new obat in the DB.
exports.create = function (req, res) {
    var obatObj = {};

    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Obat.findOne({
                nama: req.body.nama,
                satuan: req.body.satuan
            }, function (err, obat) {
                if (err) {
                    return callback(err);
                } else if (obat) {
                    obatObj = {
                        error: 'Nama Obat "' + obat.nama + '" dengan satuan "' + obat.satuan + '" sudah terdaftar di database. Silahkan input Nomor obat yang lain'
                    }
                    callback();
                } else if (!obat) {
                    Obat.create(req.body, function (err, obat) {
                        if (err) {
                            return callback(err);
                        }
                        obatObj = obat;
                        callback();
                    });
                }
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(obatObj);
    });
};

// Updates an existing obat in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    Obat.findById(req.params.id, function (err, obat) {
        if (err) {
            return handleError(res, err);
        }
        if (!obat) {
            return res.send(404);
        }
        var updated = _.merge(obat, req.body);
        updated.save(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, obat);
        });
    });
};

// Deletes a obat from the DB.
exports.destroy = function (req, res) {
    var obatObj = {};

    async.series([
        function (callback) {
            Obat.findById(req.params.id, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                obat.remove(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(obatObj);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}