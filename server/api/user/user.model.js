/**
 * User Model
 * ----------
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: { type: String, lowercase: true },
    role: { type: String, default: 'volunteer' },
    provider: String,
    hashedPassword: String,
    salt: String,
});

/**
 * Validations
 */
UserSchema.path('email').validate(function (email) {
    return email.length;
}, 'Email cannot be blank');

/**
 * Export user model
 */
module.exports = mongoose.model('User', UserSchema);
