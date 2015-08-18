'use strict';

var express = require('express');
var controller = require('./resep.controller');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/', auth.hasRole('oprstok'), controller.index);
router.get('/:id', controller.show);
router.get('/:id/:lid', auth.hasRole('oprstok'), controller.detail);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('oprstok'), multipart(), controller.update);
router.put('/upres/:id/:lid', auth.hasRole('oprstok'), multipart(), controller.upres);
router.get('/cetak1/:bulan/:tahun', controller.cetak1);
router.get('/cetak2/:bulan/:tahun', controller.cetak2);
router.get('/cetak3/:bulan/:tahun', controller.cetak3);
router.delete('/:id/:lid', auth.hasRole('oprstok'), controller.destroy);

module.exports = router;
