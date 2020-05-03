var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models-old/user');
const EmailToken = require('../models-old/email-token');
const payload = require('../helpers-old/jwt-payload');
const expiration = require('../helpers-old/expiration');
const mailer = require('../helpers-old/mailer');

/* MAGIC TOKEN REQUEST */
router.post('/login', (req, res, next) => {
    // Needs two parameters, the email to log in with AND the recaptcha token. Sends email with magic token.
    // If user doesn't exist in DB, return error BUT show prompt allowing them to register with same details.
    let email = escape(req.body.email);
    let recaptcha = escape(req.body.recaptcha);
    User.findOne({ email: [email] })
        .then((user) => {
            if(!user) {
                return res.status(401).send({
                    "success": false,
                    "status": 404,  // The status codes tend to follow HTTP codes, in this case user is Not Found (404)
                    "message": "A user with that email address was not found."
                });
            }
            if (!recaptcha) {
                return res.status(401).send({
                    "success": false,
                    "status": 401,
                    "message": "The recaptcha was below the threshold."
                });
            }
            let token = new EmailToken();
            token.user = user.id;
            token.email = email;
            token.save()
                .then((token) => {
                    mailer.send({
                        from: 'no-reply@glacier.alexmoras.com', // Sender address
                        to: token.email,         // List of recipients
                        subject: 'Glacier Login Token', // Subject line
                        html: '<p>Here is your Glacier magic-link: <a href="http://localhost:8080/login/magic/' + token.id + '">Click Here</a></p>' // Plain text body
                    })
                        .then((info) => {
                            console.log(info);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    res.status(202).send({
                        "success": true,
                        "status": 202,
                        "message": "Magic link has been sent to the email address provided. Please close this page."
                    });
                    console.log(token.id);
                })
                .catch((err) => {
                    throw new Error("Token Error: " + err);
                });
        })
        .catch((err) => {
            console.log("Login error: " + err);
            res.status(500).send({
                "success": false,
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            });
        });
});

router.post('/register', (req, res, next) => {
    // Takes same parameters as "login" but CREATES them in the DB then sends magic token to confirm.
    let email = escape(req.body.email);
    let recaptcha = escape(req.body.recaptcha);
    User.findOne({ email: email })
        .then((user) => {
            if(user) {
                return res.status(200).send({
                    "success": false,
                    "status": 409,  // The status codes tend to follow HTTP codes, in this case user is Not Found (404)
                    "message": "A user with that email address already exists."
                });
            }
            if (!recaptcha) {
                return res.status(401).send({
                    "success": false,
                    "status": 401,
                    "message": "The recaptcha was below the threshold."
                });
            }
            let newuser = new User();
            newuser.email = email;
            newuser.save()
                .then((user) => {
                    let token = new EmailToken();
                    token.user = user.id;
                    token.email = email;
                    token.save()
                        .then((token) => {
                            mailer.send({
                                from: 'no-reply@glacier.alexmoras.com', // Sender address
                                to: token.email,         // List of recipients
                                subject: 'Glacier Login Token', // Subject line
                                html: '<p>Here is your Glacier magic-link: <a href="http://localhost:8080/login/magic/' + token.id + '">Click Here</a></p>' // Plain text body
                            })
                                .then((info) => {
                                    console.log(info);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                            res.status(202).send({
                                "success": true,
                                "status": 202,
                                "message": "User has been created and a Magic Link has been sent to the email address provided. Please close this page."
                            });
                            console.log(token.id);
                        })
                        .catch((err) => {
                            throw new Error("Token Error: " + err);
                        });
                })
                .catch((err) => {
                    throw new Error(err);
                });
        })
        .catch((err) => {
            console.log("Register error: " + err);
            res.status(500).send({
                "success": false,
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            });
        });
});

/* MAGIC TOKEN EXCHANGE */
router.post('/token', (req, res, next) => {
    // Exchange magic token for JWT
    // Check token exists, then check user has email - if not, add email to user (acts as a "verified" check) then login.
    let token = escape(req.body.token);
    EmailToken.findById(token)
        .then((token) => {
            if (!token) {
                // No token found!
                return res.status(401).send({
                    "success": false,
                    "status": 404,
                    "message": "The token was not found."
                });
            }
            User.findById(token.user)
                .then((user) => {
                    if (!user) {
                        res.status(410).send({
                            "success": false,
                            "status": 410,  // User is GONE. It existed when the token was created but has since been deleted.
                            "message": "The user was not found."
                        });
                    } else {
                        if (Date.now() > expiration.hours(config.auth.magicLinkExpiration)) {
                            res.status(401).send({
                                "success": false,
                                "status": 401,
                                "message": "Token has expired."
                            });
                        } else {
                            if (user.email !== token.email) {
                                user.email = token.email;
                            }
                            payload.generate(user)
                                .then((payload) => {
                                    let jwtoken = jwt.sign(payload, config.secret.jwtPrivateKey);
                                    res.status(200).send({
                                        "success": true,
                                        "status": 200,
                                        "message": "Token found, JWT has been generated.",
                                        "token": jwtoken
                                    })
                                })
                                .catch((err) => {
                                    throw new Error(err);
                                });
                        }
                    }
                    token.remove();
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({
                        "success": false,
                        "status": 500,
                        "message": "An unknown error has occurred during user login. Please try again later."
                    })
                })
        })
        .catch((err) => {
            // Database error!
            console.log(err);
            res.status(500).send({
                "success": false,
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            })
        });
});

/* SSO HANDLER */
router.post('/sso', function (req, res, next) {
    // Accepts the auth code from OAuth and exchanges it for the user details.
    res.send("SSO");
});

/* LOGOUT HANDLER */
// Doesn't exist as users logout by deleting the JWT from local storage.

module.exports = router;
