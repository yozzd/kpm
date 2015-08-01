'use strict';

var _ = require('lodash');
var async = require('async');

var Pasien = require('../pasien/pasien.model');
var Usul = require('./usul.model');

// Get a single usul
exports.show = function (req, res) {
    var usulObj = {};

    async.series([

        function (callback) {
            Usul.findOne({
                _pasien: req.params.id
            }).populate('_pasien').exec(function (err, usul) {
                if (err) {
                    return callback(err);
                }
                usulObj = usul;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(usulObj);
    });
};

// Updates an existing usul in the DB.
exports.add = function (req, res) {
    var usulObj = {};

    async.series([

        function (callback) {
            Usul.findById(req.params.id, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                usul.usulans.push({
                    usulan: req.body.usulan
                });
                usul.save(function (data) {
                    callback();
                });
                usulObj = usul;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(usulObj._pasien, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(usul, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(usulObj);
    });
};

// Updates an existing usul in the DB.
exports.update = function (req, res) {
    var usulObj = {};

    async.series([

        function (callback) {
            Usul.findById(req.params.id, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                usul.usulans[req.body.index].usulan = req.body.usulan
                usul.markModified('usulans');
                usul.save(function (data) {
                    callback();
                });
                usulObj = usul;
            });
        },
        function (callback) {
            req.body.updated = Date.now();
            req.body.by = req.user.name;
            Pasien.findById(usulObj._pasien, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                var updated = _.merge(usul, req.body);
                updated.save(function (data) {
                    callback();
                });
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(usulObj);
    });
};

exports.rem = function (req, res) {
    console.log(req.body);
    var usulObj = {};

    async.series([

        function (callback) {
            Usul.findById(req.params.id, function (err, usul) {
                if (err) {
                    return callback(err);
                }
                usul.usulans.pull(req.body.id)
                usul.save(function (data) {
                    callback();
                });
                usulObj = usul;
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(usulObj);
    });
};

// Deletes a usul from the DB.
exports.destroy = function (req, res) {
    Usul.findById(req.params.id, function (err, usul) {
        if (err) {
            return handleError(res, err);
        }
        if (!usul) {
            return res.send(404);
        }
        usul.remove(function (err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
