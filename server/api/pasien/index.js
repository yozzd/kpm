'use strict';

var express = require('express');
var controller = require('./pasien.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.post('/', auth.hasRole('oprrekam'), controller.create);
router.put('/:id', auth.hasRole('oprrekam'), controller.update);
router.delete('/:id', auth.hasRole('oprrekam'), controller.destroy);
router.get('/cetak/:id', controller.cetak);

module.exports = router;
