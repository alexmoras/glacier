var express = require('express');
var router = express.Router();
//const jwt = require('jsonwebtoken');
//const config = require('../config');
//const User = require('../models/user');
const EmailToken = require('../models/email-token');
const responder = require('../helpers/responder');
//const payload = require('../helpers/jwt-payload');
//const expiration = require('../helpers/expiration');
const mailer = require('../helpers/mailer');

router.post('/login', (req, res, next) => {
    let email = escape(req.body.email);
    // add recaptcha

    EmailToken({ email: email }).save()
        .then(email_token => {
            mailer.send({
                to: email,
                token: email_token.id
            }, "email_token")
                .then(() => {
                    responder.success(res, 202, 202, "A magic link has been sent to the user.");
                })
                .catch(err => {
                    responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                        err);
                })
        })
        .catch(err => {
            responder.failure(res, 500, 500, "An error has occurred. Please try again later",
                err);
        });
});

module.exports = router;