'use strict';

var express = require('express');
var controller = require('./usul.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.put('/:id', auth.hasRole('oprrekam'), controller.update);
router.put('/add/:id', auth.hasRole('oprrekam'), controller.add);
router.put('/rem/:id', auth.hasRole('oprrekam'), controller.rem);
router.delete('/:id', controller.destroy);

module.exports = router;
