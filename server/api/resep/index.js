'use strict';

var express = require('express');
var controller = require('./resep.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('oprstok'), controller.index);
router.get('/:id', controller.show);
router.get('/:id/:lid', auth.hasRole('oprstok'), controller.detail);
router.post('/', controller.create);
router.put('/:id', auth.hasRole('oprstok'), controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
