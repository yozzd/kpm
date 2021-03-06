'use strict';

var express = require('express');
var controller = require('./obat.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('oprstok'), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('oprstok'), controller.create);
router.post('/copy', auth.hasRole('oprstok'), controller.copy);
router.put('/:id', auth.hasRole('oprstok'), controller.update);
router.delete('/:id', auth.hasRole('oprstok'), controller.destroy);

module.exports = router;
