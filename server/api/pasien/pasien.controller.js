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
            }, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var dt = req.body.tanggal;
                var date = new Date(dt);
                kartukontrol.kontrol.push({
                    tanggal: req.body.tanggal,
                    bulan: date.getMonth(),
                    tahun: date.getFullYear(),
                    status: 'B'
                });
                kartukontrol.save(function () {
                    callback();
                })
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
        },
        function (callback) {
            KartuKontrol.findOne({
                _pasien: pasienObj._id
            }, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var dt = req.body.tanggal;
                var date = new Date(dt);
                kartukontrol.kontrol[0].tanggal = req.body.tanggal;
                kartukontrol.kontrol[0].bulan = date.getMonth();
                kartukontrol.kontrol[0].tahun = date.getFullYear();
                kartukontrol.save(function () {
                    callback();
                })
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
    var pasienObj = {};

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
        },
        function (callback) {
            Anamnesa.findOne({
                _pasien: pasienObj._id
            }, function (err, anamnesa) {
                if (err) {
                    return callback(err);
                }
                anamnesa.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            FisikDiagnostik.findOne({
                _pasien: pasienObj._id
            }, function (err, fisikdiagnostik) {
                if (err) {
                    return callback(err);
                }
                fisikdiagnostik.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Radiologi.findOne({
                _pasien: pasienObj._id
            }, function (err, radiologi) {
                if (err) {
                    return callback(err);
                }
                radiologi.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Laboratorium.findOne({
                _pasien: pasienObj._id
            }, function (err, laboratorium) {
                if (err) {
                    return callback(err);
                }
                laboratorium.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            MedisDiagnostik.findOne({
                _pasien: pasienObj._id
            }, function (err, medisdiagnostik) {
                if (err) {
                    return callback(err);
                }
                medisdiagnostik.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Diagnosa.findOne({
                _pasien: pasienObj._id
            }, function (err, diagnosa) {
                if (err) {
                    return callback(err);
                }
                diagnosa.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Pengobatan.findOne({
                _pasien: pasienObj._id
            }, function (err, pengobatan) {
                if (err) {
                    return callback(err);
                }
                pengobatan.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Terapi.findOne({
                _pasien: pasienObj._id
            }, function (err, terapi) {
                if (err) {
                    return callback(err);
                }
                terapi.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Rehabilitasi.findOne({
                _pasien: pasienObj._id
            }, function (err, rehabilitasi) {
                if (err) {
                    return callback(err);
                }
                rehabilitasi.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Konsultasi.findOne({
                _pasien: pasienObj._id
            }, function (err, konsultasi) {
                if (err) {
                    return callback(err);
                }
                konsultasi.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Usul.findOne({
                _pasien: pasienObj._id
            }, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                usul.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            KartuKontrol.findOne({
                _pasien: pasienObj._id
            }, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrol.remove(function (data) {
                    callback();
                });
            });
        },
        function (callback) {
            Pasien.findById(req.params.id, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                pasien.remove(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(pasienObj);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
