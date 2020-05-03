var express = require('express');
var router = express.Router();
const jwt = require('../helpers/jwt');
const User = require('../models/user');
const EmailToken = require('../models/email-token');
const responder = require('../helpers/responder');
const mailer = require('../helpers/mailer');

/* GENERATE MAGIC-LINK AND EMAIL TO USER */
router.post('/login', (req, res, next) => {
    let email = escape(req.body.email);
    // TODO: add recaptcha

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