(function () {
    'use strict';

    process.env.NODE_ENV = 'test';

    var should = require('should');
    var app = require('../../app');
    var request = require('supertest');

    var User = require('./user.model');

    var user_id,
    fake_user_id = '41224d776a326fb40f000001';

    // close database connection after tests
    after(function (done) {
        // TODO: close the database connection
        done();
    });

    describe('User API:', function (done) {
        beforeEach(function() {
            // create a single user
            var lauren = new User ({ name: 'Lauren Ipsum', });
            var empty_cb = function () {};

            // clean the database of old values and insert user
            return User.remove({}, empty_cb)
            .then(function() {
                lauren.save(empty_cb);
                user_id = lauren._id;
            });
        });

        describe('GET /api/users', function (done) {
            it('should respond with a JSON array', function (done) {
                request(app)
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);

                    var users = res.body;
                    users.should.be.instanceof(Array);
                    users.length.should.equal(1);
                    done();
                });
            });
        });

        describe('GET /api/users/:id', function (done) {
            it('should respond with the JSON object', function (done) {
                request(app)
                .get('/api/users/' + user_id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);

                    var user = res.body;
                    user.should.be.instanceof(Object);
                    user.name.should.equal('Lauren Ipsum');
                    done();
                });
            });

            describe('for a non-existant user', function (done) {
                it('should respond with a 404 status', function (done) {
                    request(app)
                    .get('/api/users/' + fake_user_id)
                    .expect('Content-Type', /json/)
                    .expect(404, done);
                });
            });
        });

        describe('POST /api/users', function (done) {
            it('should respond with a 201 status and the created object', function (done) {
                request(app)
                .post('/api/users')
                .send({ name: 'Dr. Foobar', email: 'foo@bar.baz' })
                .set('Accept', 'application/json')
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);

                    var user = res.body;
                    user.should.be.instanceof(Object);
                    user.role.should.equal('volunteer');    // role defaults to volunteer
                    user.name.should.equal('Dr. Foobar');   // posted attributes properly set
                    user.email.should.equal('foo@bar.baz');
                    done();
                });
            });
        });

        describe('PATCH /api/users/:id', function (done) {
            it('should respond with an ok status and the updated object', function (done) {
                request(app)
                .patch('/api/users/' + user_id)
                .send({ email: 'lauren.ipsum@example.com', })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);

                    var user = res.body;
                    user.should.be.instanceof(Object);
                    user.email.should.equal('lauren.ipsum@example.com');
                    done();
                });
            });

            describe('for a non-existant user', function (done) {
                it('should respond with a 404 status', function (done) {
                    request(app)
                    .patch('/api/users/' + fake_user_id)
                    .expect('Content-Type', /json/)
                    .expect(404, done);
                });
            });
        });

        describe('DELETE /api/users/:id', function (done) {
            it('should respond with no content', function (done) {
                request(app)
                .del('/api/users/' + user_id)
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.match({});
                    User.count({}, function (err, count) {
                        if(err) console.warn(err);
                        count.should.equal(0);
                    });
                    done();
                });
            });

            describe('for a non-existant user', function (done) {
                it('should respond with a 404 status', function (done) {
                    request(app)
                    .delete('/api/users/' + fake_user_id)
                    .expect('Content-Type', /json/)
                    .expect(404, done);
                });
            });
        });
    });
}());
