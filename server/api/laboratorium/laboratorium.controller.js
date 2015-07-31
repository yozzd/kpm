'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Laboratorium = require('./laboratorium.model');

// Get a single laboratorium
exports.show = function (req, res) {
    var laboratoriumObj = {};

    async.series([

        function (callback) {
            Laboratorium.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, laboratorium) {
                if (err) {
                    return callback(err);
                }
                laboratoriumObj = laboratorium;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(laboratoriumObj);
    });
};

// Updates an existing laboratorium in the DB.
exports.update = function (req, res) {
    var laboratoriumObj = {};

    async.series([

        function (callback) {
            Laboratorium.findById(req.params.id, function (err, laboratorium) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(laboratorium, req.body);
                updated.save(function (data) {
                    callback();
                });
                laboratoriumObj = laboratorium;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(laboratoriumObj._pasien, function (err, laboratorium) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(laboratorium, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(laboratoriumObj);
    });
};

// Deletes a laboratorium from the DB.
exports.destroy = function (req, res) {
    Laboratorium.findById(req.params.id, function (err, laboratorium) {
        if (err) {
            return handleError(res, err);
        }
        if (!laboratorium) {
            return res.send(404);
        }
        laboratorium.remove(function (err) {
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
