/**
 * APPLICATION-WIDE CONFIGURATION
 */

(function () {
    'use strict';

    var _ = require('lodash');

    var config = {
        env: process.env.NODE_ENV,
        port: process.env.PORT || 9000,
        ip: process.env.ip || 'localhost',
    };

    module.exports = _.merge(
        config,
        require('./' + process.env.NODE_ENV + '.js') || {}
    );
}());
