/**
 * API routes
 */

(function () {
    'use strict';

    // var path = require('path');

    module.exports = function (app) {
        app.route('/').get(function (req, res) {
            res.status(200).send('Hello, world!');
        });

        // api routes pull from relevant api folder
        app.use('/api/users', require('./api/user'));

        // all unknown routes get a 404 error
        app.route('/*').get(function (req, res) {
            res.status(404).send('Page Not Found');
        });
    };
}());
