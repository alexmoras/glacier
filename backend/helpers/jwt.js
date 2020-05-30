const jwt = require('jsonwebtoken');
const userLoader = require('./user-loader');
const config = require('../config');

function generate(user) {
    let json = {
        sub: user.id,
        iss: config.jwt_issuer,
        expiresIn: config.jwt_exp, //expiration.hours(config.jwt.expiration),
        email: user.email,
        permissions: {}

    };
    if(userLoader.user_permission(user) === true){
        json.permissions.user = true;
    }
    if(userLoader.check_service_email(user) === true){
        json.permissions.service = true;
    }
    if(userLoader.has_staff_permission(user) === true){
        json.permissions.staff = true;
    }
    return jwt.sign(json, config.jwt_private)
}

module.exports = {
    generate: generate,
};