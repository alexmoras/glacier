const jwt = require('jsonwebtoken');
const userLoader = require('./user-loader');

function generate(user) {
    let json = {
        sub: user.id,
        iss: process.env.JWT_ISSUER,
        expiresIn: process.env.JWT_EXP, //expiration.hours(config.jwt.expiration),
        email: user.email,
        permission: {}

    };
    if(userLoader.check_service_email(user) === true){
        json.permission.service = true;
    }
    if(userLoader.has_staff_permission(user) === true){
        json.permission.staff = true;
    }
    return jwt.sign(json, process.env.JWT_PRIVATE)
}

module.exports = {
    generate: generate,
};