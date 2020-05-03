const config = require('../config');
const jwt = require('jsonwebtoken');

function generate(user) {
    let json = {
        sub: user.id,
        iss: config.jwt.issuer,
        expiresIn: '1m', //expiration.hours(config.jwt.expiration),
        email: user.email,
    };
    return jwt.sign(json, config.secret.jwtPrivateKey)
}

module.exports = {
    generate: generate,
};