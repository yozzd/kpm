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
                obat: req.body.obat,
                satuan: req.body.satuan,
                bulan: req.body.bulan,
                tahun: req.body.tahun
            }, function (err, obat) {
                if (err) {
                    return callback(err);
                } else if (obat) {
                    obatObj = {
                        error: 'Nama Obat "' + obat.obat + '" dengan satuan "' + obat.satuan + '" sudah terdaftar di database. Silahkan input Nomor obat yang lain'
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


exports.copy = function (req, res) {
    var obatObj = {};

    async.series([


        function (callback) {
            Obat.find({
                bulan: req.body.arr[0].bulan,
                tahun: req.body.arr[0].tahun
            }, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                if (obat.length > 1) {
                    _.forEach(obat, function (val) {
                        Obat.findById(val._id, function (err, obat) {
                            obat.remove();
                        });
                    });
                    callback();
                } else {
                    callback();
                }
            });
        },
        function (callback) {
            _.forEach(req.body.arr, function (val) {
                req.body.bulan = val.bulan;
                req.body.tahun = val.tahun;
                req.body.obat = val.obat;
                req.body.satuan = val.satuan;
                req.body.pindahan = val.pindahan + val.masuk - val.keluar;
                req.body.masuk = 0;
                req.body.created = Date.now();
                req.body.updated = null;
                req.body.by = req.user.name;
                console.log(req.body);
                Obat.create(req.body, function (err, obat) {
                    obatObj = obat;
                });
            });
            callback();
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
    var obatObj = {};

    req.body.updated = Date.now();
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Obat.findById(req.params.id, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(obat, req.body);
                updated.save(function (data) {
                    callback();
                });
                obatObj = obat;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(obatObj);
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
