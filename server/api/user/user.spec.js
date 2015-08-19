(function () {
    'use strict';

    var should = require('should');
    var app = require('../../app');
    var request = require('supertest');

    describe('GET /api/users', function (done) {
        it('should respond with a JSON array', function (done) {
            request(app)
                .get('/api/users')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });
    });

    describe('GET /api/users/:id', function (done) {
        it('should respond with the JSON object', function (done) {
            request(app)
                .get('/api/users/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Object);
                    done();
                });
        });
    });

    describe('POST /api/users', function (done) {
        it('should respond with a 201 status and the created object', function (done) {
            request(app)
                .post('/api/users')
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Object);
                    done();
                });
        });
    });

    describe('PATCH /api/users/:id', function (done) {
        it('should respond with an ok status and the updated object', function (done) {
            request(app)
                .patch('/api/users/1')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.be.instanceof(Object);
                    done();
                });
        });
    });

    describe('DELETE /api/users/:id', function (done) {
        it('should respond with no content', function (done) {
            request(app)
                .delete('/api/users/1')
                .expect(204)
                .end(function (err, res) {
                    if (err) return done(err);
                    res.body.should.match({});
                    done();
                });
        });
    });
}());
