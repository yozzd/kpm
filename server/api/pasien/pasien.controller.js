'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('./pasien.model');
var Anamnesa = require('../anamnesa/anamnesa.model');
var FisikDiagnostik = require('../fisikdiagnostik/fisikdiagnostik.model');
var Radiologi = require('../radiologi/radiologi.model');
var Laboratorium = require('../laboratorium/laboratorium.model');
var MedisDiagnostik = require('../medisdiagnostik/medisdiagnostik.model');
var Diagnosa = require('../diagnosa/diagnosa.model');
var Pengobatan = require('../pengobatan/pengobatan.model');
var Terapi = require('../terapi/terapi.model');
var Rehabilitasi = require('../rehabilitasi/rehabilitasi.model');
var Konsultasi = require('../konsultasi/konsultasi.model');
var Usul = require('../usul/usul.model');
var KartuKontrol = require('../kartukontrol/kartukontrol.model');

// Get list of pasiens
exports.index = function (req, res) {
    var pasienObj = {};

    async.series([

        function (callback) {
            Pasien.find({}).populate('_anamnesa _fisikdiagnostik _radiologi _laboratorium _medisdiagnostik _diagnosa _pengobatan _terapi _rehabilitasi _konsultasi _usul _kartukontrol').exec(function (err, pasien) {
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
            FisikDiagnostik.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Radiologi.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Laboratorium.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            MedisDiagnostik.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Diagnosa.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Pengobatan.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Terapi.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Rehabilitasi.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Konsultasi.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            Usul.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            KartuKontrol.create({
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
