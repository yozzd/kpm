/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function () {
    User.create({
        provider: 'local',
        role: 'admin',
        path: 'admin',
        name: 'admin',
        email: 'admin',
        password: 'adminx'
    }, {
        provider: 'local',
        role: 'oprrekam',
        path: 'rekam',
        name: 'rekam',
        email: 'rekam',
        password: 'rekamx'
    }, {
        provider: 'local',
        role: 'oprstok',
        path: 'stok',
        name: 'stok',
        email: 'stok',
        password: 'stokx'
    }, function () {
        console.log('finished populating users');
    });
});