'use strict';

var express = require('express');
var controller = require('./kartukontrol.controller');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/', auth.hasRole('oprrekam'), controller.index);
router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.post('/files/:id', auth.hasRole('oprrekam'), multipart(), controller.files);
router.put('/:id', auth.hasRole('oprrekam'), multipart(), controller.update);
router.put('/rem/:id', auth.hasRole('oprrekam'), controller.rem);
router.get('/cetak/:lid/:bulan/:tahun', controller.cetak);
router.get('/chart/linechart/:d/:t', controller.linechart);
router.get('/chart/barchart/:d/:t', controller.barchart);
router.get('/chart/piechart/:d/:t', controller.piechart);
router.delete('/:id', controller.destroy);

module.exports = router;
