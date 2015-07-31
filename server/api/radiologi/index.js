'use strict';

var express = require('express');
var controller = require('./radiologi.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.put('/:id', auth.hasRole('oprrekam'), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
