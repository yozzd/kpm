'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra');
var NodePDF = require('nodepdf');
var moment = require('moment');
moment.locale('id');

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
var Resep = require('../resep/resep.model');

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
    var pasienObj = {};

    async.series([

        function (callback) {
            Pasien.find({}).populate('_anamnesa _fisikdiagnostik _radiologi _laboratorium _medisdiagnostik _diagnosa _pengobatan _terapi _rehabilitasi _konsultasi _usul _kartukontrol _resep').exec(function (err, pasien) {
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
        },
        function (callback) {
            Resep.create({
                _pasien: pasienObj._id
            }, function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                callback();
            });
        },
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
            Resep.findOne({
                _pasien: pasienObj._id
            }, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resep.remove(function (data) {
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

exports.cetak = function (req, res) {
    var pasienObj = {};
    async.series([

        function (callback) {
            Pasien.findOne({
                _id: req.params.id
            }).populate('_anamnesa _fisikdiagnostik _radiologi _laboratorium _medisdiagnostik _diagnosa _pengobatan _terapi _rehabilitasi _konsultasi _usul _kartukontrol').exec(function (err, pasien) {
                if (err) {
                    return callback(err);
                }
                pasienObj = pasien;
                callback();
            });
        },
        function (callback) {

            var content = '';
            content += '<html>';
            content += '<style>';
            content += 'body {font-size: 12px;}';
            content += 'table {font-size: 12px; width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; border-top: 1px solid #000000; border-left: 1px solid #000000;}';
            content += '.table th, .table td {padding: 2px 4px 4px 4px; text-align: left; vertical-align: middle; border-right: 1px solid #000000; border-bottom: 1px solid #000000;}';
            content += '.table th {font-weight: bold;}';
            content += '.table thead th {vertical-align: middle;}';
            content += '</style>';
            content += '<body>';

            content += '<div style=\'text-align: center;\'>';
            content += '<h3>KESEHATAN PARU MASYARAKAT (KPM)<br/>UPT. DINAS KESEHATAN PROVINSI SUMATERA UTARA</h3>';
            content += '<p><strong><u>KARTU STATUS PASIEN RAWAT JALAN</u></strong></p>';
            content += '<table style=\'width: 35%; border: 0; margin-top: -10px; margin-left: 260px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 22%;\'>Nomor</td>';
            content += '<td style=\'width: 8%;\'>:</td>';
            content += '<td><strong>' + pasienObj.nomor + '</strong></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>Tanggal</td>';
            content += '<td>:</td>';
            if (pasienObj.tanggal === '') {
                content += '<td></td>';
            } else {
                content += '<td><strong>' + moment(pasienObj.tanggal).format('DD MMMM YYYY') + '</strong></td>';
            }
            content += '</tr>';
            content += '</table>';
            content += '</div>';

            content += '<table style=\'border: 0; margin-top: 20px;\'>';
            content += '<tr>';
            content += '<td colspan=\'2\' style=\'width: 30%;\'>Nama</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td><strong>' + pasienObj.nama + '</strong></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Umur</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.umur + ' ' + pasienObj.satuanumur + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Jenis Kelamin</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.jeniskelamin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Alamat</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Jalan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.jalan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Lingkungan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.lingkungan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Kelurahan / Kecamatan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.kelkec + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Kota / Kabupaten</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.kotkab + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>Provinsi</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.provinsi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>-</td>';
            content += '<td>No. Telp. / HP</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.telp + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Suku</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.suku + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Agama</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.agama + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Pekerjaan</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.pekerjaan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Status Keluarga</td>';
            content += '<td>:</td>';
            content += '<td>' + pasienObj.statuskeluarga + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Dikirim / Konsul dari</td>';
            content += '<td>:</td>';
            if (pasienObj.dikirim === null) {
                content += '<td></td>';
            } else if (pasienObj.dikirim === 'Puskesmas' || pasienObj.dikirim === 'Rumah Sakit / Klinik' || pasienObj.dikirim === 'Praktek Dokter Swasta (PDS)' || pasienObj.dikirim === 'Dll') {
                content += '<td>' + pasienObj.dikirim + ' <strong>' + pasienObj.kdikirim + '</strong></td>';
            } else {
                content += '<td>' + pasienObj.dikirim + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td colspan=\'2\'>Pembiayaan</td>';
            content += '<td>:</td>';
            if (pasienObj.pembiayaan === null) {
                content += '<td></td>';
            } else if (pasienObj.pembiayaan === 'Dll') {
                content += '<td>' + pasienObj.pembiayaan + ' <strong>' + pasienObj.kpembiayaan + '</strong></td>';
            } else {
                content += '<td>' + pasienObj.pembiayaan + '</td>';
            }
            content += '</tr>';
            content += '</table>'

            content += '<p><strong><u>I. ANAMNESA</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Keluhan Utama</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Batuk</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.batuk + '</td>';
            content += '</tr>'
            if (pasienObj._anamnesa.batuk === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.lamabatuk + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.intensitasbatuk + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Frekuensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.frekuensibatuk + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Batuk Darah</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.batukdarah + '</td>';
            content += '</tr>';
            if (pasienObj._anamnesa.batukdarah === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.lamabatukdarah + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.intensitasbatukdarah + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Volume</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.volumebatukdarah + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Sesak Napas</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.sesak + '</td>';
            content += '</tr>';
            if (pasienObj._anamnesa.sesak === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.lamasesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sifat Sesak</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.sifatsesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Intensitas</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.intensitassesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Frekuensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.frekuensisesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Mengi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.mengisesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Bertambah di malam hari</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.bertambahsesak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Faktor Pencetus</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.pencetussesak + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Dahak</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.dahak + '</td>';
            content += '</tr>';
            if (pasienObj._anamnesa.dahak === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Volume</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.volumedahak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Warna</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.warnadahak + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Konsistensi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.konsistensidahak + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Nyeri Dada</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.nyeridada + '</td>';
            content += '</tr>';
            if (pasienObj._anamnesa.nyeridada === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Lokasi</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.lokasinyeridada + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Keluhan Tambahan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Demam</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.demam + '</td>';
            content += '</tr>';
            if (pasienObj._anamnesa.demam === 'Ya') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sejak Berapa Lama</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.lamademam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Pagi / Siang</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.pagisiangdemam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Sore</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.soredemam + '</td>';
                content += '</tr>';
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td>Malam</td>';
                content += '<td>:</td>';
                content += '<td>' + pasienObj._anamnesa.malamdemam + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Keringat Malam</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.keringat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Nafsu makan / BB menurun</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.nafsu + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Badan lemah / Tidak enak badan</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.lemah + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Lain-lain</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.lain + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td colspan=\'2\'>Riwayat Penyakit Sebelumnya</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.penyakit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td colspan=\'2\'>Riwayat Pengobatan Sebelumnya</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.pengobatan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>5.</td>';
            content += '<td colspan=\'2\'>Kebiasaan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td>Merokok</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Lama</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._anamnesa.lamamerokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._anamnesa.lamamerokok + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Banyak</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._anamnesa.banyakrokok === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._anamnesa.banyakrokok + ' btg/hari</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td>Obat-obatan</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Jenis</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.jenisobat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Lama</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._anamnesa.lamaobat === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._anamnesa.lamaobat + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td>Alkohol</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Jenis</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.jenisalkohol + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Lama</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._anamnesa.lamaalkohol === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._anamnesa.lamaalkohol + ' tahun</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>6.</td>';
            content += '<td colspan=\'2\'>Anamnesa Keluarga</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td>Penderita TBC Paru</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.tbcparu + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td>Jika Ya Siapa</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.tbcparuya + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td>Riwayat Asma pada Keluarga</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.asma + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td>Jika Ya Siapa</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._anamnesa.asmaya + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>II. FISIK DIAGNOSTIK</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Keadaan Umum</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.keadaan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Kesadaran</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.kesadaran + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td colspan=\'2\'>Frekuensi Pernapasan (RR)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._fisikdiagnostik.frekuensi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._fisikdiagnostik.frekuensi + ' x/menit</td>';
            }
            content += '</tr>'
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td colspan=\'2\'>Pols / Nadi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._fisikdiagnostik.nadi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._fisikdiagnostik.nadi + ' x/menit</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>5.</td>';
            content += '<td colspan=\'2\'>Suhu tubuh</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._fisikdiagnostik.suhu === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._fisikdiagnostik.suhu + ' <sup>o</sup>C</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>6.</td>';
            content += '<td colspan=\'2\'>Dispnoe</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.dispnoe + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>7.</td>';
            content += '<td colspan=\'2\'>Orthopnoe</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.orthopnoe + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>8.</td>';
            content += '<td colspan=\'2\'>Odem Pre Tibial / Pre Orbital</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.odem + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>9.</td>';
            content += '<td colspan=\'2\'>Lain-lain</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.lain + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>10.</td>';
            content += '<td colspan=\'2\'>Dada</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Paru</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Inspeksi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.inspeksi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Palpasi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.palpasi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Perkusi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.perkusi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Auskultasi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.auskultasi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Abdomen</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.abdomen + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Hepar</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.hepar + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Limpa</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.limpa + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Extrimitas</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.extrimitas + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Cor</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>HR</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.hr + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>ST</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.st + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>11.</td>';
            content += '<td colspan=\'2\'>Anemis</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.anemis + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>12.</td>';
            content += '<td colspan=\'2\'>Sianosis</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.sianosis + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>13.</td>';
            content += '<td colspan=\'2\'>Ikhterus</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._fisikdiagnostik.ikhterus + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>14.</td>';
            content += '<td colspan=\'2\'>Berat Badan</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._fisikdiagnostik.berat === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._fisikdiagnostik.berat + ' kg</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>15.</td>';
            content += '<td colspan=\'2\'>Tinggi </td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._fisikdiagnostik.tinggi === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._fisikdiagnostik.tinggi + ' cm</td>';
            }
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>III. PEMERIKSAAN RADIOLOGI</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Thorak PA / Bilateral</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._radiologi.thorakpatgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._radiologi.thorakpatgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil Foto</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._radiologi.thorakpahasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td colspan=\'2\'>CT Scan Thorak</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._radiologi.thorakcttgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._radiologi.thorakcttgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil Foto</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._radiologi.thorakcthasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td colspan=\'2\'>USG Thorak</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._radiologi.thorakusgtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._radiologi.thorakusgtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil Foto</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._radiologi.thorakusghasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>IV. PEMERIKSAAN LABORATORIUM</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Darah Rutin / Lengkap</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Hb</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.hb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>LED</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.led + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Leukosit</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.leukosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Thrombosit</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.thrombosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Erythrosit</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.erythrosit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>f.</td>';
            content += '<td>Haematokrit (Ht)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.haematokrit + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>g.</td>';
            content += '<td>Golongan Darah</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.darah + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Urine Rutin / Lengkap</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Ph</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ph + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Reduksi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.reduksi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Protein</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.protein + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Bilirubin</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.bilirubin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Sedimen</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.sedimen + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td colspan=\'2\'>Faeces Rutin</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.faeces + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td colspan=\'2\'>Mikrobiologi</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Direct Smear BTA (SPS)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.dsbta + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>I</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.dsbta1 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>II</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.dsbta2 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>III</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.dsbta3 + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Kultur / Resistansi BTA</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.bta === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.bta).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Sensitif</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.btasensitif + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Resinten</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.btaresinten + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Direct Smear Gran Sputum</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.dssputum + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Kultur / Resistansi Sputum</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.sputumtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.sputumtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Sensitif</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.sputumsensitif + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Resinten</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.sputumresinten + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Direct (Jamur/Spora)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.jamur + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>f.</td>';
            content += '<td>Kultur Jamur</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.jamurtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.jamurtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>g.</td>';
            content += '<td>Kultur Cairan Pleura</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.kulturpleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.kulturpleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>5.</td>';
            content += '<td colspan=\'2\'>Kimia Klinik</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Analisa Cairan Pleura</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.analisapleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.analisapleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Test Rivalta</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.rivalta + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>LDH</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ldhpleura + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Protein</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.proteinpleura + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Transudat / Exudat</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.transudat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Faal Hati</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.faalhatitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.faalhatitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>SGOT</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.sgot + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>SGPT</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.sgpt + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Bil. Total / Direct</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.biltotal + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Bil. Direct</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.bildirect + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Alkali Fosfatase</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.fosfatase + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Protein Elektrofores (SPE)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.elektrofores + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Total Protein</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.total + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Faal Ginjal</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.faalginjaltgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.faalginjaltgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Ureum</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ureum + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Kratinin</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.kratinin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Asam Urat</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.asamurat + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Kratinin Urine</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.kratininurine + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Protein Urine 24 Jam</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.proteinurine + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Elektrolit Darah</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.elektrolittgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.elektrolittgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Natrium</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.natrium + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Kalium</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.kalium + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Chlorida</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.chlorida + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>AGDA</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.agda + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>f.</td>';
            content += '<td>Profil Jantung</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.jantungtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.jantungtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>EKG</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ekg + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Treadmill</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.treadmill + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>CPK / CK - Nac</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.cpk + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>LDH</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ldhjantung + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Troponin I</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.troponin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>g.</td>';
            content += '<td>Test Gula Darah</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.glukosatgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.glukosatgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Glukosa Puasa</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.glukosapuasa + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Glukosa 2 Jam PP</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.glukosapp + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Glukosa Ad Random</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.glukosarandom + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>h.</td>';
            content += '<td>Profil Lipid</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._laboratorium.lipidtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._laboratorium.lipidtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>HDL Cholesterol</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.hdl + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>LDL Cholesterol</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.ldl + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Cholesterol Total</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.cholesterol + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Triglecerida</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.triglecerida + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>Lipid Total</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._laboratorium.lipidtotal + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>V. PEMERIKSAAN / TINDAKAN MEDIS DIAGNOSTIK</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Bronkhoskopi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.bronkhoskopitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.bronkhoskopitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._medisdiagnostik.bronkhoskopihasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Test Faal Paru & Jantung</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>Spirometer</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.spirometertgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.spirometertgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>EVC</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.evc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>FVC (KVP)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.fvc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>FEVI (VEPI)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.fevi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>%FVC (%KVP)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.persenfvc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td>%FEVI (%VEPI)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.persenfevi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td></td>';
            content += '<td>Kesimpulan</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.kesimpulan === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._medisdiagnostik.kesimpulan + ' : ' + pasienObj._medisdiagnostik.subkesimpulan + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>PEFR (APE)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.pefrtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.pefrtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasienObj._medisdiagnostik.pefr !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td style=\'width: 2%;\'>:</td>';
                content += '<td>' + pasienObj._medisdiagnostik.pefr + ' L/menit</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Test Bronkhodilator</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.bronkhodilatortgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.bronkhodilatortgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasienObj._medisdiagnostik.bronkhodilator !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td style=\'width: 2%;\'>:</td>';
                content += '<td>' + pasienObj._medisdiagnostik.bronkhodilator + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>d.</td>';
            content += '<td>Test Provokasi Bronkhus</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.bronkhustgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.bronkhustgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            if (pasienObj._medisdiagnostik.bronkhus !== '') {
                content += '<tr>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td></td>';
                content += '<td style=\'width: 2%;\'>:</td>';
                content += '<td>' + pasienObj._medisdiagnostik.bronkhus + ' : ' + pasienObj._medisdiagnostik.subbronkhus + '</td>';
                content += '</tr>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>e.</td>';
            content += '<td>Elektrokardiograf (EKG)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.ekgtgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.ekgtgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._medisdiagnostik.ekghasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>f.</td>';
            content += '<td>Test Treadmill</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.treadmilltgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.treadmilltgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._medisdiagnostik.treadmillhasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td colspan=\'2\'>Immulogo</td>';
            content += '<td></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>a.</td>';
            content += '<td>LGE Total</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.lge + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>b.</td>';
            content += '<td>Test Alergi Kulit (Skin Test)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.skin === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._medisdiagnostik.skin + ' : ' + pasienObj._medisdiagnostik.subskin + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td></td>';
            content += '<td style=\'width: 3%;\'>c.</td>';
            content += '<td>Test Tuberkulin (Mantoux)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.tuberkulin + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td colspan=\'2\'>Proof Punctie Pleura</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._medisdiagnostik.pleuratgl === null) {
                content += '<td></td>';
            } else {
                content += '<td>' + moment(pasienObj._medisdiagnostik.pleuratgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._medisdiagnostik.pleurahasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'>5.</td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Histoli, Sitologi (Biopsi Jarum Halus, Biopsi Aspirsi sdb)</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            if (pasienObj._medisdiagnostik.histolitgl === null) {
                content += '<td></td>';
            } else {
                content += '<td style=\'vertical-align: top;\'>' + moment(pasienObj._medisdiagnostik.histolitgl).format('DD MMMM YYYY') + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>Lokasi</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.histolilokasi + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>Bahan</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._medisdiagnostik.histolibahan + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%; vertical-align: top;\'></td>';
            content += '<td colspan=\'2\' style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._medisdiagnostik.histolihasil.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>VI. DIAGNOSA</u></strong></p>';
            content += '<table style=\'border: 0; margin-top: 5px;\'>';
            content += '<tr>';
            content += '<td style=\'width: 43%;\'>Diagnosa Primer</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._diagnosa.primer + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'vertical-align: top;\'>Hasil</td>';
            content += '<td style=\'width: 2%; vertical-align: top;\'>:</td>';
            content += '<td style=\'vertical-align: top;\'>' + pasienObj._diagnosa.keterangan.replace(/(?:\r\n|\r|\n)/g, '<br/>') + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td>Diagnosa Sekunder</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + _.chain(pasienObj._diagnosa.sekunder).pluck('opsi').value().join(', ') + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>VII. PENGOBATAN</u></strong></p>';
            content += '<table style="border: 0; margin-top: 5px;">';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>TB - OAT</td>';
            content += '<td style=\'width: 2%;\'></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>Kategori</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.tb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>a.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.tba + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>b.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.tbb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>c.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.tbc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>d.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.tbd + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Non TB</td>';
            content += '<td style=\'width: 2%;\'></td>';
            content += '<td></td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>a.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.nontba + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>b.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.nontbb + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>c.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.nontbc + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'></td>';
            content += '<td colspan=\'2\'>d.</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._pengobatan.nontbd + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>VIII. TINDAKAN MEDIK TERAPI</u></strong></p>';
            content += '<table style="border: 0; margin-top: 5px;">';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>1.</td>';
            content += '<td colspan=\'2\' style=\'width: 40%;\'>Nebulizer</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._terapi.nebulizer + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>2.</td>';
            content += '<td colspan=\'2\'>Punctie Pleura</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            if (pasienObj._terapi.punctie === '') {
                content += '<td></td>';
            } else {
                content += '<td>' + pasienObj._terapi.punctie + ' : ' + pasienObj._terapi.subpunctie + '</td>';
            }
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>3.</td>';
            content += '<td colspan=\'2\'>Water Sealed Drainage (WSD)</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._terapi.wsd + '</td>';
            content += '</tr>';
            content += '<tr>';
            content += '<td style=\'width: 3%;\'>4.</td>';
            content += '<td colspan=\'2\'>Pleurodesis</td>';
            content += '<td style=\'width: 2%;\'>:</td>';
            content += '<td>' + pasienObj._terapi.pleurodesis + '</td>';
            content += '</tr>';
            content += '</table>';

            content += '<p><strong><u>IX. REHABILITASI MEDIK</u></strong></p>';
            content += '<table style="border: 0; margin-top: 5px;">';
            for (var i = 0; i < pasienObj._rehabilitasi.rehab.length; i++) {
                content += '<tr>';
                content += '<td style=\'width: 3%;\'>' + (i + 1) + '.</td>';
                content += '<td>' + pasienObj._rehabilitasi.rehab[i] + '</td>';
                content += '</tr>';
            }
            content += '</table>';

            content += '<p><strong><u>X. KONSULTASI KHUSUS</u></strong></p>';
            content += '<table style="border: 0; margin-top: 5px;">';
            for (var j = 0; j < pasienObj._konsultasi.konsul.length; j++) {
                content += '<tr>';
                content += '<td style=\'width: 3%;\'>' + (j + 1) + '.</td>';
                content += '<td>' + pasienObj._konsultasi.konsul[j] + '</td>';
                content += '</tr>';
            }
            content += '</table>';

            content += '<p><strong><u>XI. USUL/TINDAKAN LANJUT</u></strong></p>';
            content += '<table style="border: 0; margin-top: 5px;">';
            var usul = _.chain(pasienObj._usul.usulans).pluck('usulan').value();
            for (var k = 0; k < usul.length; k++) {
                content += '<tr>';
                content += '<td style=\'width: 3%;\'>' + (k + 1) + '.</td>';
                content += '<td>' + usul[k] + '</td>';
                content += '</tr>';
            }
            content += '</table>';

            content += '</body>';
            content += '</html>';
            NodePDF.render(null, 'client/app/rekam/pdf/' + req.params.id, {
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
            fse.readFile('client/app/rekam/pdf/' + req.params.id, function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
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
