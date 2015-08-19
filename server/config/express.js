/**
 * Express configuration
 */

(function () {
    'use strict';

    var express = require('express');
    var bodyParser = require('body-parser');

    module.exports = function (app) {
        // parse http request body (json)
        app.use(bodyParser.json());

        // add more middleware here
    };
})();
