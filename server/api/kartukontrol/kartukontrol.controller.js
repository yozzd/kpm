'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra')
var NodePDF = require('nodepdf');
var moment = require('moment');
moment.locale('id');

var Pasien = require('../pasien/pasien.model');
var KartuKontrol = require('./kartukontrol.model');
var OpsiDiagnosa = require('../opsidiagnosa/opsidiagnosa.model');

function base64_encode(file) {
    var bitmap = fse.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fse.writeFileSync(file, bitmap);
}

// Get list of pasiens
exports.index = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.find({}).populate('_pasien').exec(function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrolObj = kartukontrol;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

// Get a single kartukontrol
exports.show = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrolObj = kartukontrol;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

exports.files = function (req, res) {
    var kartukontrolObj = {};
    var file = req.files.file;
    var dt = req.body.tanggal;
    var date = new Date(dt);

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                if (file === undefined) {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        bulan: date.getMonth(),
                        tahun: date.getFullYear(),
                        image: kartukontrol.image === '' ? '' : kartukontrol.image,
                        imagename: kartukontrol.imagename === '' ? '' : kartukontrol.imagename,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        did: req.body.did,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi,
                        status: 'L'
                    });
                    kartukontrol.save(function (data) {
                        callback();
                    });
                } else {
                    kartukontrol.kontrol.push({
                        tanggal: req.body.tanggal,
                        bulan: date.getMonth(),
                        tahun: date.getFullYear(),
                        image: 'data:' + file.type + ';base64,' + base64_encode(file.path),
                        imagename: file.name,
                        keluhan: req.body.keluhan,
                        lab: req.body.lab,
                        sputum: req.body.sputum,
                        mt: req.body.mt,
                        berat: req.body.berat,
                        tinggi: req.body.tinggi,
                        did: req.body.did,
                        diagnosa: req.body.diagnosa,
                        terapi: req.body.terapi,
                        status: 'L'
                    });
                    kartukontrol.save(function (data) {
                        callback();
                    });
                }
                kartukontrolObj = kartukontrol;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(kartukontrolObj._pasien, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(kartukontrol, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

// Updates an existing kartukontrol in the DB.
exports.update = function (req, res) {
    var kartukontrolObj = {};
    var file = req.files.file;
    var dt = req.body.tanggal;
    var date = new Date(dt);

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var index = _.findIndex(kartukontrol.kontrol, function (chr) {
                    return chr._id.toString() === req.body.id;
                });
                if (file === undefined) {
                    kartukontrol.kontrol[index].tanggal = req.body.tanggal;
                    kartukontrol.kontrol[index].bulan = date.getMonth();
                    kartukontrol.kontrol[index].tahun = date.getFullYear();
                    kartukontrol.kontrol[index].image = kartukontrol.image === '' ? '' : kartukontrol.image;
                    kartukontrol.kontrol[index].imagename = kartukontrol.imagename === '' ? '' : kartukontrol.imagename;
                    kartukontrol.kontrol[index].keluhan = req.body.keluhan;
                    kartukontrol.kontrol[index].lab = req.body.lab;
                    kartukontrol.kontrol[index].sputum = req.body.sputum;
                    kartukontrol.kontrol[index].mt = req.body.mt;
                    kartukontrol.kontrol[index].berat = req.body.berat;
                    kartukontrol.kontrol[index].tinggi = req.body.tinggi;
                    kartukontrol.kontrol[index].did = req.body.did;
                    kartukontrol.kontrol[index].diagnosa = req.body.diagnosa;
                    kartukontrol.kontrol[index].terapi = req.body.terapi;
                    kartukontrol.kontrol[index].status = 'L';
                    kartukontrol.save(function (data) {
                        callback();
                    });
                } else {
                    kartukontrol.kontrol[index].tanggal = req.body.tanggal;
                    kartukontrol.kontrol[index].bulan = date.getMonth();
                    kartukontrol.kontrol[index].tahun = date.getFullYear();
                    kartukontrol.kontrol[index].image = 'data:' + file.type + ';base64,' + base64_encode(file.path);
                    kartukontrol.kontrol[index].imagename = file.name;
                    kartukontrol.kontrol[index].keluhan = req.body.keluhan;
                    kartukontrol.kontrol[index].lab = req.body.lab;
                    kartukontrol.kontrol[index].sputum = req.body.sputum;
                    kartukontrol.kontrol[index].mt = req.body.mt;
                    kartukontrol.kontrol[index].berat = req.body.berat;
                    kartukontrol.kontrol[index].tinggi = req.body.tinggi;
                    kartukontrol.kontrol[index].did = req.body.did;
                    kartukontrol.kontrol[index].diagnosa = req.body.diagnosa;
                    kartukontrol.kontrol[index].terapi = req.body.terapi;
                    kartukontrol.kontrol[index].status = 'L';
                    kartukontrol.save(function (data) {
                        callback();
                    });
                }
                kartukontrolObj = kartukontrol;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(kartukontrolObj._pasien, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(kartukontrol, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

exports.rem = function (req, res) {
    var kartukontrolObj = {};

    async.series([

        function (callback) {
            KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrol.kontrol.pull(req.body.id)
                kartukontrol.save(function (data) {
                    callback();
                });
                kartukontrolObj = kartukontrol;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

exports.cetak = function (req, res) {
    var kartukontrolObj = {};
    var opsidiagnosaObj = {};
    var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var bulan = _.indexOf(bulans, req.params.bulan);

    async.series([

        function (callback) {
            KartuKontrol.find({}).populate('_pasien').exec(function (err, kartukontrol) {
                if (err) {
                    return callback(err);
                }
                kartukontrolObj = kartukontrol;
                callback();
            });
        },
        function (callback) {
            OpsiDiagnosa.findOne({
                oid: req.params.lid
            }, function (err, opsidiagnosa) {
                if (err) {
                    return callback(err);
                }
                opsidiagnosaObj = opsidiagnosa;
                callback();
            });
        },
        function (callback) {
            var temp = [];
            _.map(kartukontrolObj, function (chr) {
                for (var i = 0; i < chr.kontrol.length; i++) {
                    temp.push({
                        id: chr._pasien._id,
                        tanggal: moment(chr.kontrol[i].tanggal).format('DD MMMM YYYY'),
                        bulan: chr.kontrol[i].bulan,
                        tahun: chr.kontrol[i].tahun,
                        nomor: chr._pasien.nomor,
                        nama: chr._pasien.nama,
                        umur: chr._pasien.umur,
                        jeniskelamin: chr._pasien.jeniskelamin,
                        did: chr.kontrol[i].did,
                        status: chr.kontrol[i].status
                    });
                }
            });
            var match = _.where(temp, {
                did: req.params.lid.toString(),
                bulan: bulan.toString(),
                tahun: req.params.tahun.toString()
            });
            var bydate = _.chain(match).uniq('tanggal').pluck('tanggal').sortBy().value();

            var content = '';
            content += '<html>';
            content += '<style>';
            content += 'body {font-size: 12px;}';
            content += 'table {font-size: 12px; width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; border-top: 1px solid #000000; border-left: 1px solid #000000;}';
            content += '.table th, .table td {padding: 2px 4px 4px 4px; text-align: left; vertical-align: middle; border-right: 1px solid #000000; border-bottom: 1px solid #000000;}';
            content += '.table th {font-weight: bold; border-top: 1px solid #000000; border-left: 1px solid #000000;}';
            content += '.table thead th {vertical-align: middle;}';
            content += '</style>';
            content += '<body>';

            content += '<div style=\'text-align: center; margin-bottom: 20px;\'>';
            content += '<h3>Laporan ' + opsidiagnosaObj.opsi + '<br/>Bulan ' + req.params.bulan + ' Tahun ' + req.params.tahun + '</h3>';
            content += '</div>';

            content += '<table class=\'table\' style=\'border: 0;\'>';
            content += '<thead>';
            content += '<tr>';
            content += '<th style=\'text-align: center;\'>Nomor</th>';
            content += '<th style=\'text-align: center;\'>Nama</th>';
            content += '<th style=\'text-align: center;\'>Umur</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>16 - 40</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>41 - 60</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>&gt; 60</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>16 - 40</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>41 - 60</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>&gt; 60</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>B</th>';
            content += '<th style=\'text-align: center; width: 7%;\'>L</th>';
            content += '</tr>';
            content += '<tr>';
            content += '<th colspan=\'12\' style=\'height: 28px; border-right: 0; border-left: 0; border-bottom: 0;\'></th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';
            for (var i = 0; i < bydate.length; i++) {
                content += '<tr>';
                content += '<td style=\'border-right: 0;\' colspan=\'12\'>' + bydate[i] + '</td>';
                content += '</tr>';
                for (var j = 0; j < match.length; j++) {
                    if (match[j].tanggal === bydate[i]) {
                        content += '<tr>';
                        content += '<td style=\'border-left: 1px solid #000000;\'>' + match[j].nomor + '</td>';
                        content += '<td>' + match[j].nama + '</td>';
                        content += '<td style=\'text-align: center;\'>' + match[j].umur + ' tahun</td>';
                        if (match[j].jeniskelamin === 'L' && match[j].umur >= 16 && match[j].umur <= 40) {
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                        }
                        if (match[j].jeniskelamin === 'L' && match[j].umur >= 41 && match[j].umur <= 60) {
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                        }
                        if (match[j].jeniskelamin === 'L' && match[j].umur > 60) {
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                        }
                        if (match[j].jeniskelamin === 'P' && match[j].umur >= 16 && match[j].umur <= 40) {
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                        }
                        if (match[j].jeniskelamin === 'P' && match[j].umur >= 41 && match[j].umur <= 60) {
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td style=\'width: 5%;\'></td>';
                        }
                        if (match[j].jeniskelamin === 'P' && match[j].umur > 60) {
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'width: 5%;\'></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                        }
                        if (match[j].status === 'B') {
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                            content += '<td></td>';
                        }
                        if (match[j].status === 'L') {
                            content += '<td></td>';
                            content += '<td style=\'text-align: center; width: 5%;\'>x</td>';
                        }
                        content += '</tr>';
                    }
                }
                content += '<tr>';
                content += '<td colspan=\'12\' style=\'height: 28px; border-right: 0; border-bottom: 0;\'></td>';
                content += '</tr>';
            }
            content += '</tbody>';
            content += '</table>';

            content += '</body>';
            content += '</html>';
            NodePDF.render(null, 'client/app/rekam/pdf/laporan.pdf', {
                'content': content,
                'paperSize': {
                    'format': 'Legal',
                    'orientation': 'portrait',
                    'margin': {
                        'top': '1cm',
                        'right': '1cm',
                        'bottom': '1cm',
                        'left': '1cm'
                    }
                }
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
        function (callback) {
            fse.readFile('client/app/rekam/pdf/laporan.pdf', function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(kartukontrolObj);
    });
};

// Deletes a kartukontrol from the DB.
exports.destroy = function (req, res) {
    KartuKontrol.findById(req.params.id, function (err, kartukontrol) {
        if (err) {
            return handleError(res, err);
        }
        if (!kartukontrol) {
            return res.send(404);
        }
        kartukontrol.remove(function (err) {
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
