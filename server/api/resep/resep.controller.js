'use strict';

var _ = require('lodash');
var async = require('async');
var fse = require('fs-extra')
var NodePDF = require('nodepdf');
var moment = require('moment');
moment.locale('id');

var Resep = require('./resep.model');
var Obat = require('../obat/obat.model');

function base64_encode(file) {
    var bitmap = fse.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str, 'base64');
    fse.writeFileSync(file, bitmap);
}

// Get list of reseps
exports.index = function (req, res) {
    var resepObj = {};

    async.series([

        function (callback) {
            Resep.find({}).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Get a single resep
exports.show = function (req, res) {
    Resep.findById(req.params.id, function (err, resep) {
        if (err) {
            return handleError(res, err);
        }
        if (!resep) {
            return res.send(404);
        }
        return res.json(resep);
    });
};

exports.detail = function (req, res) {
    var resepObj = {};

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                var match = [];
                var filter = _.filter(resep.lists, function (value) {
                    return value._id.toString() === req.params.lid;
                });
                match.push({
                    tanggal: filter[0].tanggal,
                    bulan: filter[0].bulan,
                    tahun: filter[0].tahun,
                    items: filter[0].items,
                    dokter: filter[0].dokter,
                    image: filter[0].image,
                    imagename: filter[0].imagename,
                    contenttype: filter[0].contenttype,
                    nama: resep._pasien.nama,
                    umur: resep._pasien.umur,
                    satuanumur: resep._pasien.satuanumur,
                    jeniskelamin: resep._pasien.jeniskelamin,
                });
                resepObj = match;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Creates a new resep in the DB.
exports.create = function (req, res) {
    var resepObj = {};

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.create(req.body, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Updates an existing resep in the DB.
exports.update = function (req, res) {
    var resepObj = {};
    var file = req.files.file;
    var arr = JSON.parse(req.body.arr);

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.created = Date.now();
    req.body.updated = null;
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                if (file === undefined) {
                    resep.lists.push({
                        tanggal: req.body.tanggal,
                        bulan: req.body.bulan,
                        tahun: req.body.tahun,
                        items: arr,
                        dokter: req.body.dokter,
                        image: '',
                        imagename: '',
                        contenttype: '',
                        created: req.body.created,
                        updated: req.body.updated,
                        by: req.body.by,
                    })
                    resep.save(function (data) {
                        callback();
                    });
                } else {
                    resep.lists.push({
                        tanggal: req.body.tanggal,
                        bulan: req.body.bulan,
                        tahun: req.body.tahun,
                        items: arr,
                        dokter: req.body.dokter,
                        image: base64_encode(file.path),
                        imagename: file.name,
                        contenttype: file.type,
                        created: req.body.created,
                        updated: req.body.updated,
                        by: req.body.by,
                    })
                    resep.save(function (data) {
                        callback();
                    });
                }
                resepObj = resep;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};


exports.upres = function (req, res) {
    var resepObj = {};
    var file = req.files.file;
    var arr = JSON.parse(req.body.arr);

    var dt = req.body.tanggal;
    var date = new Date(dt);

    req.body.bulan = date.getMonth();
    req.body.tahun = date.getFullYear();
    req.body.updated = Date.now();
    req.body.by = req.user.name;

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                var index = _.findIndex(resep.lists, function (value) {
                    return value._id.toString() === req.params.lid;
                });
                if (file === undefined) {
                    resep.lists[index].tanggal = req.body.tanggal;
                    resep.lists[index].bulan = req.body.bulan;
                    resep.lists[index].tahun = req.body.tahun;
                    resep.lists[index].items = arr;
                    resep.lists[index].dokter = req.body.dokter;
                    resep.lists[index].image = resep.lists[index].image === '' ? '' : resep.lists[index].image;
                    resep.lists[index].imagename = resep.lists[index].imagename === '' ? '' : resep.lists[index].imagename;
                    resep.lists[index].contenttype = resep.lists[index].contenttype === '' ? '' : resep.lists[index].contenttype;
                    resep.lists[index].updated = req.body.updated;
                    resep.lists[index].by = req.body.by;
                    resep.save(function (data) {
                        callback();
                    });
                } else {
                    resep.lists[index].tanggal = req.body.tanggal;
                    resep.lists[index].bulan = req.body.bulan;
                    resep.lists[index].tahun = req.body.tahun;
                    resep.lists[index].items = arr;
                    resep.lists[index].dokter = req.body.dokter;
                    resep.lists[index].image = base64_encode(file.path);
                    resep.lists[index].imagename = file.name;
                    resep.lists[index].contenttype = file.type;
                    resep.lists[index].updated = req.body.updated;
                    resep.lists[index].by = req.body.by;
                    resep.save(function (data) {
                        callback();
                    });
                }
                resepObj = resep;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

// Deletes a resep from the DB.
exports.destroy = function (req, res) {
    var resepObj = {};

    async.series([

        function (callback) {
            Resep.findOne({
                _pasien: req.params.id
            }, function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resep.lists.pull(req.params.lid)
                resep.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

exports.cetak1 = function (req, res) {
    var resepObj = {};
    var obatObj = {};

    var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var bulan = _.indexOf(bulans, req.params.bulan);

    async.series([

        function (callback) {
            Resep.find({}).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        },
        function (callback) {
            Obat.find({}, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                obatObj = obat;
                callback();
            });
        },
        function (callback) {

            var filter1 = _.filter(obatObj, function (value) {
                return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
            });
            var obat = _.chain(filter1).uniq('obat').pluck('obat').sortBy().value();
            var pindahan = _.chain(filter1).uniq('pindahan').pluck('pindahan').sortBy().value();
            var masuk = _.chain(filter1).uniq('masuk').pluck('masuk').sortBy().value();

            function total(x, y) {
                var filter2;
                if (x === 'bpjs') {
                    filter2 = _.filter(resepObj, function (value) {
                        return value.lists.length > 0 && value._pasien.pembiayaan === 'BPJS';
                    });
                } else if (x === 'umum') {
                    filter2 = _.filter(resepObj, function (value) {
                        return value.lists.length > 0 && value._pasien.pembiayaan !== 'BPJS';
                    });
                }

                var arr1 = [];
                _.forEach(filter2, function (val1) {
                    _.forEach(val1.lists, function (val2) {
                        _.forEach(val2.items, function (val3) {
                            arr1.push({
                                tanggal: val2.tanggal,
                                bulan: val2.bulan,
                                tahun: val2.tahun,
                                oid: val3.oid,
                                obat: val3.obat,
                                jumlah: val3.jumlah
                            });
                        });
                    });
                });

                var filter3 = _.filter(arr1, function (value) {
                    return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
                });

                var arr2 = [];
                var filter4 = _.filter(filter3, function (val2) {
                    return val2.obat === y;
                });
                _.forEach(filter4, function (val2) {
                    arr2.push(val2.jumlah);
                });

                var count = _.reduce(arr2, function (a, b) {
                    return a + b;
                });
                return count;
            }

            var arr3 = [];
            _.forEach(obat, function (val) {
                if (total('bpjs', val) === undefined && total('umum', val) === undefined) {
                    arr3.push(0);
                } else if (total('bpjs', val) !== undefined && total('umum', val) === undefined) {
                    arr3.push(total('bpjs', val));
                } else if (total('bpjs', val) === undefined && total('umum', val) !== undefined) {
                    arr3.push(total('umum', val));
                } else {
                    arr3.push(total('bpjs', val) + total('umum', val));
                }
            });

            var arr4 = [];
            _.forEach(filter1, function (val) {
                arr4.push({
                    id: val._id,
                    obat: val.obat,
                    satuan: val.satuan,
                    pindahan: val.pindahan,
                    masuk: val.masuk
                });
            });

            var arr5 = _.chain(arr4).sortBy('obat').value();

            var arr6 = [];
            _.forEach(arr3, function (val) {
                arr6.push({
                    keluar: val
                });
            });
            var result = _.merge(arr6, arr5);

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
            content += '<h3 style=\'text-align: center\'>Rekap BPJS & Umum<br>Bulan ' + req.params.bulan + ' Tahun ' + req.params.tahun + '</h3>';
            content += '<table class=\'table\'>';
            content += '<thead>';
            content += '<tr>';
            content += '<th style=\'text-align: center\'>No</th>';
            content += '<th>Nama Obat</th>';
            content += '<th style=\'text-align: center\'>Pindahan</th>';
            content += '<th style=\'text-align: center\'>Masuk</th>';
            content += '<th style=\'text-align: center\'>Keluar</th>';
            content += '<th style=\'text-align: center\'>Sisa</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';
            _.forEach(result, function (val, key) {
                content += '<tr>';
                content += '<td style=\'text-align: center\'>' + (key + 1) + '</td>';
                content += '<td>' + val.obat + '</td>';
                content += '<td style=\'text-align: right\'>' + val.pindahan + '</td>';
                content += '<td style=\'text-align: right\'>' + val.masuk + '</td>';
                content += '<td style=\'text-align: right\'>' + val.keluar + '</td>';
                content += '<td style=\'text-align: right\'>' + (val.pindahan + val.masuk - val.keluar) + '</td>';
                content += '</tr>';
            });
            content += '</tbody>';
            content += '</table>';
            content += '</body>';
            content += '</html>';
            NodePDF.render(null, 'client/app/stok/pdf/rekap_bpjs_umum.pdf', {
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
            fse.readFile('client/app/stok/pdf/rekap_bpjs_umum.pdf', function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

exports.cetak2 = function (req, res) {
    var resepObj = {};
    var obatObj = {};

    var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var bulan = _.indexOf(bulans, req.params.bulan);

    async.series([

        function (callback) {
            Resep.find({}).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        },
        function (callback) {
            Obat.find({}, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                obatObj = obat;
                callback();
            });
        },
        function (callback) {

            var filter1 = _.filter(obatObj, function (value) {
                return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
            });
            var obat = _.chain(filter1).uniq('obat').pluck('obat').sortBy().value();

            var filter2 = _.filter(resepObj, function (value) {
                return value.lists.length > 0 && value._pasien.pembiayaan === 'BPJS';
            });

            var arr1 = [];
            _.forEach(filter2, function (val1) {
                _.forEach(val1.lists, function (val2) {
                    _.forEach(val2.items, function (val3) {
                        arr1.push({
                            tanggal: moment(val2.tanggal).format(),
                            bulan: val2.bulan,
                            tahun: val2.tahun,
                            oid: val3.oid,
                            obat: val3.obat,
                            jumlah: val3.jumlah
                        });
                    });
                });
            });

            var filter3 = _.filter(arr1, function (value) {
                return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
            });
            var bydate = _.chain(filter3).uniq('tanggal').pluck('tanggal').sortBy().value();

            var arr2 = [];
            var jumlah = [];
            _.forEach(obat, function (val1) {
                var filter4 = _.filter(filter3, function (val2) {
                    return val2.obat === val1;
                });
                var sum = 0;
                _.forEach(filter4, function (val2) {
                    sum += val2.jumlah;
                });
                jumlah.push(sum);
                arr2.push(filter4);
            });

            var arr3 = [];
            _.forEach(bydate, function (val1) {
                _.forEach(arr2, function (val2) {
                    var filter = _.filter(val2, function (val) {
                        return val.tanggal === val1;
                    });
                    var sum = 0;
                    if (filter.length > 1) {
                        _.forEach(filter, function (val) {
                            sum += val.jumlah;
                        });
                        _.forEach(filter, function (val) {
                            val.jumlah = sum;
                        });
                    }
                    var filter5 = _.findWhere(filter, {
                        tanggal: val1
                    });
                    arr3.push(filter5);
                });
            });

            var arr4 = [];
            _.forEach(arr3, function (val) {
                if (val === undefined) {
                    arr4.push(0);
                } else {
                    arr4.push(val.jumlah);
                }
            });

            var total = 0;
            _.forEach(jumlah, function (val) {
                total += val;
            });

            //column partition
            function partition1(arr, divider) {
                var group = _.groupBy(arr, function (item, i) {
                    return Math.floor(i % divider);
                });
                return _.map(group);
            }
            //row partition
            function partition2(arr, divider) {
                var group = _.groupBy(arr, function (item, i) {
                    return Math.floor(i / divider);
                });
                return _.map(group);
            }

            var jumlaht = partition1(jumlah, obat.length);
            var column = partition1(arr4, obat.length);

            var crow = partition2(arr4, obat.length);
            var arr5 = [];
            _.forEach(crow, function (val, key) {
                var count = _.reduce(crow[key], function (a, b) {
                    return a + b;
                });
                arr5.push(count);
            });
            var row = partition1(arr5, bydate.length);

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
            content += '<h3 style=\'text-align: center\'>Rekap BPJS<br>Bulan ' + req.params.bulan + ' Tahun ' + req.params.tahun + '</h3>';
            content += '<table class=\'table\'>';
            content += '<thead>';
            content += '<tr>';
            content += '<th style=\'text-align: center\'>No</th>';
            content += '<th>Nama Obat</th>';
            _.forEach(bydate, function (val) {
                content += '<th style=\'text-align: center\'>' + moment(val).format('DD') + '</th>';
            });
            content += '<th style=\'text-align: center\'>Jumlah</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';
            _.forEach(obat, function (val, key) {
                content += '<tr>';
                content += '<td style=\'text-align: center; width: 5%;\'>' + (key + 1) + '</td>';
                content += '<td>' + val + '</td>';
                _.forEach(column[key], function (val) {
                    content += '<td style=\'text-align: center; width: 5%;\'>' + val + '</td>';
                });
                _.forEach(jumlaht[key], function (val) {
                    content += '<td style=\'text-align: center; width: 5%;\'>' + val + '</td>';
                });
                content += '</tr>';
            });
            content += '<tr>';
            content += '<td></td>';
            content += '<td><strong>Total</strong></td>';
            _.forEach(row, function (val) {
                content += '<td style=\'text-align: center; width: 5%;\'>' + val[0] + '</td>';
            });
            content += '<td style=\'text-align: center\'>' + total + '</td>';
            content += '</tr>';
            content += '</tbody>';
            content += '</table>';
            content += '</body>';
            content += '</html>';
            NodePDF.render(null, 'client/app/stok/pdf/rekap_bpjs.pdf', {
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
            fse.readFile('client/app/stok/pdf/rekap_bpjs.pdf', function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

exports.cetak3 = function (req, res) {
    var resepObj = {};
    var obatObj = {};

    var bulans = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var bulan = _.indexOf(bulans, req.params.bulan);

    async.series([

        function (callback) {
            Resep.find({}).populate('_pasien').exec(function (err, resep) {
                if (err) {
                    return callback(err);
                }
                resepObj = resep;
                callback();
            });
        },
        function (callback) {
            Obat.find({}, function (err, obat) {
                if (err) {
                    return callback(err);
                }
                obatObj = obat;
                callback();
            });
        },
        function (callback) {

            var filter1 = _.filter(obatObj, function (value) {
                return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
            });
            var obat = _.chain(filter1).uniq('obat').pluck('obat').sortBy().value();

            var filter2 = _.filter(resepObj, function (value) {
                return value.lists.length > 0 && value._pasien.pembiayaan !== 'BPJS';
            });

            var arr1 = [];
            _.forEach(filter2, function (val1) {
                _.forEach(val1.lists, function (val2) {
                    _.forEach(val2.items, function (val3) {
                        arr1.push({
                            tanggal: moment(val2.tanggal).format(),
                            bulan: val2.bulan,
                            tahun: val2.tahun,
                            oid: val3.oid,
                            obat: val3.obat,
                            jumlah: val3.jumlah
                        });
                    });
                });
            });

            var filter3 = _.filter(arr1, function (value) {
                return value.bulan === bulan.toString() && value.tahun === req.params.tahun.toString();
            });
            var bydate = _.chain(filter3).uniq('tanggal').pluck('tanggal').sortBy().value();

            var arr2 = [];
            var jumlah = [];
            _.forEach(obat, function (val1) {
                var filter4 = _.filter(filter3, function (val2) {
                    return val2.obat === val1;
                });
                var sum = 0;
                _.forEach(filter4, function (val2) {
                    sum += val2.jumlah;
                });
                jumlah.push(sum);
                arr2.push(filter4);
            });

            var arr3 = [];
            _.forEach(bydate, function (val1) {
                _.forEach(arr2, function (val2) {
                    var filter = _.filter(val2, function (val) {
                        return val.tanggal === val1;
                    });
                    var sum = 0;
                    if (filter.length > 1) {
                        _.forEach(filter, function (val) {
                            sum += val.jumlah;
                        });
                        _.forEach(filter, function (val) {
                            val.jumlah = sum;
                        });
                    }
                    var filter5 = _.findWhere(filter, {
                        tanggal: val1
                    });
                    arr3.push(filter5);
                });
            });

            var arr4 = [];
            _.forEach(arr3, function (val) {
                if (val === undefined) {
                    arr4.push(0);
                } else {
                    arr4.push(val.jumlah);
                }
            });

            var total = 0;
            _.forEach(jumlah, function (val) {
                total += val;
            });

            //column partition
            function partition1(arr, divider) {
                var group = _.groupBy(arr, function (item, i) {
                    return Math.floor(i % divider);
                });
                return _.map(group);
            }
            //row partition
            function partition2(arr, divider) {
                var group = _.groupBy(arr, function (item, i) {
                    return Math.floor(i / divider);
                });
                return _.map(group);
            }

            var jumlaht = partition1(jumlah, obat.length);
            var column = partition1(arr4, obat.length);

            var crow = partition2(arr4, obat.length);
            var arr5 = [];
            _.forEach(crow, function (val, key) {
                var count = _.reduce(crow[key], function (a, b) {
                    return a + b;
                });
                arr5.push(count);
            });
            var row = partition1(arr5, bydate.length);

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
            content += '<h3 style=\'text-align: center\'>Rekap Umum<br>Bulan ' + req.params.bulan + ' Tahun ' + req.params.tahun + '</h3>';
            content += '<table class=\'table\'>';
            content += '<thead>';
            content += '<tr>';
            content += '<th style=\'text-align: center\'>No</th>';
            content += '<th>Nama Obat</th>';
            _.forEach(bydate, function (val) {
                content += '<th style=\'text-align: center\'>' + moment(val).format('DD') + '</th>';
            });
            content += '<th style=\'text-align: center\'>Jumlah</th>';
            content += '</tr>';
            content += '</thead>';
            content += '<tbody>';
            _.forEach(obat, function (val, key) {
                content += '<tr>';
                content += '<td style=\'text-align: center; width: 5%;\'>' + (key + 1) + '</td>';
                content += '<td>' + val + '</td>';
                _.forEach(column[key], function (val) {
                    content += '<td style=\'text-align: center; width: 5%;\'>' + val + '</td>';
                });
                _.forEach(jumlaht[key], function (val) {
                    content += '<td style=\'text-align: center; width: 5%;\'>' + val + '</td>';
                });
                content += '</tr>';
            });
            content += '<tr>';
            content += '<td></td>';
            content += '<td><strong>Total</strong></td>';
            _.forEach(row, function (val) {
                content += '<td style=\'text-align: center; width: 5%;\'>' + val[0] + '</td>';
            });
            content += '<td style=\'text-align: center\'>' + total + '</td>';
            content += '</tr>';
            content += '</tbody>';
            content += '</table>';
            content += '</body>';
            content += '</html>';
            NodePDF.render(null, 'client/app/stok/pdf/rekap_umum.pdf', {
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
            fse.readFile('client/app/stok/pdf/rekap_umum.pdf', function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(resepObj);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
