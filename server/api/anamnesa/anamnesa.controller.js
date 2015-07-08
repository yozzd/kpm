'use strict';

var _ = require('lodash');
var async = require('async');

var Anamnesa = require('./anamnesa.model');
var Pasien = require('../pasien/pasien.model');


// Get a single anamnesa
exports.show = function (req, res) {
    var anamnesaObj = {};

    async.series([

        function (callback) {
            Anamnesa.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, anamnesa) {
                if (err) {
                    return callback(err);
                }
                anamnesaObj = anamnesa;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(anamnesaObj);
    });
};

// Updates an existing anamnesa in the DB.
exports.update = function (req, res) {
    var anamnesaObj = {};

    async.series([

        function (callback) {
            Anamnesa.findById(req.params.id, function (err, anamnesa) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(anamnesa, req.body);
                updated.save(function (data) {
                    callback();
                });
                anamnesaObj = anamnesa;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(anamnesaObj._pasien, function (err, anamnesa) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(anamnesa, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(anamnesaObj);
    });
};

// Deletes a anamnesa from the DB.
exports.destroy = function (req, res) {
    Anamnesa.findById(req.params.id, function (err, anamnesa) {
        if (err) {
            return handleError(res, err);
        }
        if (!anamnesa) {
            return res.send(404);
        }
        anamnesa.remove(function (err) {
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
