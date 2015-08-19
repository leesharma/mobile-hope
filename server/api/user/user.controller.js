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
    // GET index: list of users
    exports.index = function (req, res) {
        users = [
            { name: 'Lauren Ipsum', },
        ];
        return res.status(200).json(users);
    };

    // GET show: a single user
    exports.show = function (req, res) {
        user = { name: 'Lauren Ipsum', };
        return res.status(200).json(user);
    };

    // POST create
    exports.create = function (req, res) {
        user = { name: 'Lauren Ipsum', };
        return res.status(201).json(user);
    };

    // PATCH update
    exports.update = function (req, res) {
        user = { name: 'Lauren Ipsum', };
        return res.status(200).json(user);
    };

    // DELETE destroy
    exports.destroy = function (req, res) {
        res.status(204).send('No Content');
    };
}());
