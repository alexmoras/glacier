var express = require('express');
var router = express.Router();
const jwt = require('../helpers/jwt');
const User = require('../models/user');
const EmailToken = require('../models/email-token');
const responder = require('../helpers/responder');
const mailer = require('../helpers/mailer');
const axios = require('axios');
const config = require('../config');

/* GENERATE MAGIC-LINK AND EMAIL TO USER */
router.post('/login', (req, res, next) => {
    let email = escape(req.body.email);
    let url = escape(req.body.url);
    // TODO: add recaptcha

    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return responder.failure(res, 401, 401, "reCAPTCHA code was not sent in the request body.")
    }
    let verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + config.recaptcha_secret + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    axios({
        method: 'get',
        url: verificationUrl
    })
        .then(response => {
            if(response.data.success !== undefined && !response.data.success){
                let err = new Error("No reCaptcha token was provided.");
                err.status = 401;
                throw err;
            } else{
                return EmailToken({ email: email }).save();
            }
        })
        .then(email_token => {
            mailer.send({
                to: email,
                token: email_token.id
            }, "email_token", url)
                .then(() => {
                    responder.success(res, 202, 202, "A magic link has been sent to the user.");
                })
                .catch(err => {
                    responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                        err);
                })
        })
        .catch(err => {
            next(err);
        });
});

/* EXCHANGE MAGIC-TOKEN FOR A JSON WEB TOKEN (JWT) */
router.post('/token', (req, res, next) => {
    let token = escape(req.body.token);
    EmailToken.findById(token)
        .then(token => {
            if(!token){
                responder.failure(res, 404, 404, "The provided token was invalid.");
            } else {
                User.findOne({"email": token.email})
                    .then(user => {
                        if (!user) {
                            user = User({"email": token.email});
                            user.save()
                                .catch(err => {
                                    responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                                        err);
                                });
                        }
                        responder.success(res, 202, 202, {"token": jwt.generate(user)});
                        token.remove();
                    })
                    .catch(err => {
                        responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                            err);
                    });
            }
        })
        .catch(err => {
            responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                err);
        });
});

module.exports = router;