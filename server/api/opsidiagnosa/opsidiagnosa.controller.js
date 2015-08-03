'use strict';

var _ = require('lodash');
var async = require('async');

var OpsiDiagnosa = require('./opsidiagnosa.model');

// Get list of opsidiagnosas
exports.index = function (req, res) {
    var opsidiagnosasObj = {};

    async.series([

        function (callback) {
            OpsiDiagnosa.find(function (err, opsidiagnosas) {
                if (err) {
                    return callback(err);
                }
                opsidiagnosasObj = opsidiagnosas;
                callback();
            });
        }
    ], function (err) {
        if (err) {
            return res.send(err);
        }
        return res.json(opsidiagnosasObj);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
