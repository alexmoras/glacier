const config = require('../config');
const jwt = require('jsonwebtoken');
const userLoader = require('./user-loader');

function generate(user) {
    let json = {
        sub: user.id,
        iss: config.jwt.issuer,
        expiresIn: '1m', //expiration.hours(config.jwt.expiration),
        email: user.email,
        permission: {}

    };
    if(userLoader.check_service_email(user) === true){
        json.permission.service = true;
    }
    if(userLoader.has_staff_permission(user) === true){
        json.permission.staff = true;
    }
    return jwt.sign(json, config.secret.jwtPrivateKey)
}

module.exports = {
    generate: generate,
};