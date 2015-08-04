'use strict';

var express = require('express');
var controller = require('./kartukontrol.controller');
var auth = require('../../auth/auth.service');
var multipart = require('connect-multiparty');

var router = express.Router();

router.get('/:id', auth.hasRole('oprrekam'), controller.show);
router.post('/', auth.hasRole('oprrekam'), controller.create);
router.post('/files/:id', auth.hasRole('oprrekam'), multipart(), controller.files);
router.put('/:id', auth.hasRole('oprrekam'), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
