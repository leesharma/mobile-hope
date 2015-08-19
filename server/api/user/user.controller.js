/**
 * Users Controller
 *
 *  Endpoints:
 *      GET /api/users          -> index
 *      GET /api/users/:id      -> show
 *      POST /api/users         -> create
 *      PATCH /api/users/:id    -> update
 *      DELETE /api/users/:id   -> destroy
 */

(function () {
    var _    = require ('lodash');
    var User = require('./user.model');

    function handleError(res, err) {
        return res.status(500).json(err);
    }

    function handle404(res) {
        return res.status(404).json({ error: 'Record not found', });
    }

    // GET index: list of users
    exports.index = function (req, res) {
        User.find(function (err, users) {
            if (err) return handleError(res, err);
            return res.status(200).json(users);
        });
    };

    // GET show: a single user
    exports.show = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err)   return handleError(res, err);
            if (!user) return handle404(res);

            return res.status(200).json(user);
        });
    };

    // POST create: create a new user record
    exports.create = function (req, res) {
        User.create(req.body, function (err, user) {
            if (err) return handleError(res, err);
            return res.status(201).json(user);
        });
    };

    // PATCH update: update attributes for a single user
    exports.update = function (req, res) {
        if(req.body._id) delete req.body._id;

        User.findById(req.params.id, function (err, user) {
            if (err)   return handleError(res, err);
            if (!user) return handle404(res);

            var updated = _.assign(user, req.body);
            updated.save(function (err) {
                if (err) return handleError(res, err);
                return res.status(200).json(user);
            });
        });
    };

    // DELETE destroy: delete a single user by id
    exports.destroy = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if(err)   return handleError(res, err);
            if(!user) return handle404(res);

            user.remove(function(err) {
                if(err) return handleError(res, err);
                return res.status(204).send('No Content');
            });
        });
    };
}());
