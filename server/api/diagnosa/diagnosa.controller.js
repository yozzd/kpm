'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Diagnosa = require('./diagnosa.model');

// Get a single diagnosa
exports.show = function (req, res) {
    var diagnosaObj = {};

    async.series([

        function (callback) {
            Diagnosa.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, diagnosa) {
                if (err) {
                    return callback(err);
                }
                diagnosaObj = diagnosa;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(diagnosaObj);
    });
};

// Updates an existing diagnosa in the DB.
exports.update = function (req, res) {
    var diagnosaObj = {};
    console.log(req.body);

    if (req.body.sekunder.length < 1) {
        async.series([

            function (callback) {
                Diagnosa.update({
                    _id: req.params.id
                }, {
                    $set: {
                        sekunder: []
                    }
                }, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    callback();
                });
            },
            function (callback) {
                Diagnosa.findById(req.params.id, function (err, diagnosa) {
                    if (err) {
                        return callback(err);
                    }
                    var updated = _.merge(diagnosa, req.body);
                    updated.save(function (data) {
                        callback();
                    });
                    diagnosaObj = diagnosa;
                });
            },
            function (callback) {
                req.body.updated = Date.now();
                req.body.by = req.user.name;
                Pasien.findById(diagnosaObj._pasien, function (err, diagnosa) {
                    if (err) {
                        return callback(err);
                    }
                    var updated = _.merge(diagnosa, req.body);
                    updated.save(function (data) {
                        callback();
                    });
                });
            }
        ], function (err) {
            if (err) {
                return res.send(err);
            }
            return res.json(diagnosaObj);
        });
    } else {
        async.series([

            function (callback) {
                Diagnosa.update({
                    _id: req.params.id
                }, {
                    $set: {
                        sekunder: []
                    }
                }, function (err) {
                    if (err) {
                        return callback(err);
                    }
                    callback();
                });
            },
            function (callback) {
                Diagnosa.findById(req.params.id, function (err, diagnosa) {
                    if (err) {
                        return callback(err);
                    }
                    for (var i = 0; i < req.body.sekunder.length; i++) {
                        diagnosa.sekunder.push({
                            _id: req.body.sekunder[i]._id,
                            oid: req.body.sekunder[i].oid,
                            opsi: req.body.sekunder[i].opsi
                        });
                        diagnosa.save();
                    }
                    diagnosa.primer = req.body.primer;
                    diagnosa.keterangan = req.body.keterangan;
                    diagnosa.save(function (data) {
                        callback();
                    });
                    diagnosaObj = diagnosa;
                });
            },
            function (callback) {
                req.body.updated = Date.now();
                req.body.by = req.user.name;
                Pasien.findById(diagnosaObj._pasien, function (err, diagnosa) {
                    if (err) {
                        return callback(err);
                    }
                    var updated = _.merge(diagnosa, req.body);
                    updated.save(function (data) {
                        callback();
                    });
                });
            }
        ], function (err) {
            if (err) {
                return res.send(err);
            }
            return res.json(diagnosaObj);
        });
    }
};

// Deletes a diagnosa from the DB.
exports.destroy = function (req, res) {
    Diagnosa.findById(req.params.id, function (err, diagnosa) {
        if (err) {
            return handleError(res, err);
        }
        if (!diagnosa) {
            return res.send(404);
        }
        diagnosa.remove(function (err) {
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
