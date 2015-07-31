'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Rehabilitasi = require('./rehabilitasi.model');

// Get a single rehabilitasi
exports.show = function (req, res) {
    var rehabilitasiObj = {};

    async.series([

        function (callback) {
            Rehabilitasi.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, rehabilitasi) {
                if (err) {
                    return callback(err);
                }
                rehabilitasiObj = rehabilitasi;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rehabilitasiObj);
    });
};

// Updates an existing rehabilitasi in the DB.
exports.update = function (req, res) {
    console.log((req.body.rehab).length < 1);
    var rehabilitasiObj = {};

    async.series([

        function (callback) {
            Rehabilitasi.update({
                _id: req.params.id
            }, {
                $set: {
                    rehab: ''
                }
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Rehabilitasi.findById(req.params.id, function (err, rehabilitasi) {
                if (err) {
                    return callback(err);
                }
                if ((req.body.rehab).length < 1) {
                    req.body.rehab = null;
                    var update = _.merge(rehabilitasi, req.body);
                    update.save(function (data) {
                        callback();
                    });
                } else {
                    var updated = _.merge(rehabilitasi, req.body);
                    updated.save(function (data) {
                        callback();
                    });
                }
                rehabilitasiObj = rehabilitasi;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(rehabilitasiObj._pasien, function (err, rehabilitasi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(rehabilitasi, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(rehabilitasiObj);
    });
};

// Deletes a rehabilitasi from the DB.
exports.destroy = function (req, res) {
    Rehabilitasi.findById(req.params.id, function (err, rehabilitasi) {
        if (err) {
            return handleError(res, err);
        }
        if (!rehabilitasi) {
            return res.send(404);
        }
        rehabilitasi.remove(function (err) {
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
