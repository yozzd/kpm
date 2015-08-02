'use strict';

var express = require('express');
var controller = require('./radiologi.controller');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.put('/:id', auth.hasRole('oprrekam'), controller.update);
router.put('/files/:id', auth.hasRole('oprrekam'), multipart(), controller.files);
router.put('/delimg/:id', auth.hasRole('oprrekam'), controller.delimg);
router.delete('/:id', controller.destroy);

module.exports = router;
