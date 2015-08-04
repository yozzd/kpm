'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra')

var Pasien = require('../pasien/pasien.model');
var Radiologi = require('./radiologi.model');

function base64_encode(file) {
    var bitmap = fse.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fse.writeFileSync(file, bitmap);
}

// Get a single radiologi
exports.show = function (req, res) {
    var radiologiObj = {};

    async.series([

        function (callback) {
            Radiologi.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                radiologiObj = radiologi;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(radiologiObj);
    });
};

// Updates an existing radiologi in the DB.
exports.update = function (req, res) {
    var radiologiObj = {};

    async.series([

        function (callback) {
            Radiologi.findById(req.params.id, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                radiologi.thorakpatgl = req.body.thorakpatgl;
                radiologi.thorakpahasil = req.body.thorakpahasil;
                radiologi.thorakcttgl = req.body.thorakcttgl;
                radiologi.thorakcthasil = req.body.thorakcthasil;
                radiologi.thorakusgtgl = req.body.thorakusgtgl;
                radiologi.thorakusghasil = req.body.thorakusghasil;
                radiologi.save(function (data) {
                    callback();
                });
                radiologiObj = radiologi;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(radiologiObj._pasien, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(radiologi, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(radiologiObj);
    });
};

exports.files = function (req, res) {
    var radiologiObj = {};
    var file = req.files.file;

    async.series([

        function (callback) {
            Radiologi.findById(req.params.id, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                if (file === undefined) {
                    radiologi.image = radiologi.image === '' ? '' : radiologi.image;
                    radiologi.imagename = radiologi.imagename === '' ? '' : radiologi.imagename;
                    radiologi.thorakpatgl = req.body.thorakpatgl;
                    radiologi.thorakpahasil = req.body.thorakpahasil;
                    radiologi.thorakcttgl = req.body.thorakcttgl;
                    radiologi.thorakcthasil = req.body.thorakcthasil;
                    radiologi.thorakusgtgl = req.body.thorakusgtgl;
                    radiologi.thorakusghasil = req.body.thorakusghasil;
                    radiologi.save(function (data) {
                        callback();
                    });
                } else {
                    radiologi.image = 'data:' + file.type + ';base64,' + base64_encode(file.path);
                    radiologi.imagename = file.name;
                    radiologi.thorakpatgl = req.body.thorakpatgl;
                    radiologi.thorakpahasil = req.body.thorakpahasil;
                    radiologi.thorakcttgl = req.body.thorakcttgl;
                    radiologi.thorakcthasil = req.body.thorakcthasil;
                    radiologi.thorakusgtgl = req.body.thorakusgtgl;
                    radiologi.thorakusghasil = req.body.thorakusghasil;
                    radiologi.save(function (data) {
                        callback();
                    });
                }
                radiologiObj = radiologi;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(radiologiObj._pasien, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(radiologi, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(radiologiObj);
    });
};

exports.delimg = function (req, res) {
    var radiologiObj = {};

    async.series([

        function (callback) {
            Radiologi.findById(req.params.id, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(radiologi, req.body);
                updated.save(function (data) {
                    callback();
                });
                radiologiObj = radiologi;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(radiologiObj);
    });
};

// Deletes a radiologi from the DB.
exports.destroy = function (req, res) {
    Radiologi.findById(req.params.id, function (err, radiologi) {
        if (err) {
            return handleError(res, err);
        }
        if (!radiologi) {
            return res.send(404);
        }
        radiologi.remove(function (err) {
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
