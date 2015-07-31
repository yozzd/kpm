/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function (app) {

    // Insert routes below
    app.use('/api/rehabilitasis', require('./api/rehabilitasi'));
    app.use('/api/terapis', require('./api/terapi'));
    app.use('/api/pengobatans', require('./api/pengobatan'));
    app.use('/api/diagnosas', require('./api/diagnosa'));
    app.use('/api/medisdiagnostiks', require('./api/medisdiagnostik'));
    app.use('/api/laboratoriums', require('./api/laboratorium'));
    app.use('/api/radiologis', require('./api/radiologi'));
    app.use('/api/fisikdiagnostiks', require('./api/fisikdiagnostik'));
    app.use('/api/anamnesas', require('./api/anamnesa'));
    app.use('/api/pasiens', require('./api/pasien'));
    app.use('/api/users', require('./api/user'));

    app.use('/auth', require('./auth'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get(errors[404]);

    // All other routes should redirect to the index.html
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};
