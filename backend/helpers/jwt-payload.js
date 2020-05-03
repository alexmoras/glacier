const expiration = require('../helpers/expiration');
const merge = require('merge');
const IceUser = require('../models/ice-user');
const ServiceUser = require('../models/service-user');
const config = require('../config');

async function generate(user) {
    let json = {
        sub: user.id,
        iss: config.jwt.issuer,
        expiresIn: 60, //expiration.hours(config.jwt.expiration),
        email: user.email,
        type: []
    };
    let ice = await IceUser.findById(user)
        .then((iceuser) => {
            let json = {};
            if (!iceuser) {
                throw new Error("User does not have an ICE account.");
            }
            json["forename"] = iceuser.forename;
            json["surname"] = iceuser.surname;
            json.type.push({ "ice": true });
            return json;
        })
        .catch(() => {
            return null;
        });
    let service = await ServiceUser.findById(user)
        .then((serviceuser) => {
            let json = {};
            if (!serviceuser) {
                throw new Error("User does not have a SERVICE account.")
            }
            json.type.push({ "service": true });
            return json;
        })
        .catch(() => {
            return null;
        });
    return await merge(json, ice, service);
}

module.exports = {
    generate: generate,
};