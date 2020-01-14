var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/user');
const EmailToken = require('../models/email-token');

/* MAGIC TOKEN REQUEST */
router.post('/login', (req, res, next) => {
    // Needs two parameters, the email to log in with AND the recaptcha token. Sends email with magic token.
    // If user doesn't exist in DB, return error BUT show prompt allowing them to register with same details.
    let email = escape(req.body.email);
    let recaptcha = escape(req.body.recaptcha);
    User.findOne({ email: [email] }, (err, user) => {
        if (err) {
            // Database error!
            console.log("Login error: " + err);
            res.status(500).send({
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            });
        } else {
            if (!user) {
                // No user found!
                res.status(401).send({
                    "status": 401,
                    "message": "The email and password combination was not recognised. Please check and try again."
                });
            } else {
                if(!recaptcha){
                    // Oops, captcha didn't match!
                    res.status(401).send({
                        "status": 401,
                        "message": "The reCaptcha was incorrect. Please try again."
                    });
                } else {
                    let token = new EmailToken();
                    token.user = user.id;
                    token.email = email;
                    token.save((err, token) => {
                        if(err){
                            res.status(500).send({
                                "status": 500,
                                "message": "An unknown error has occurred during user login. Please try again later."
                            });
                            console.log(err);
                        } else {
                            res.status(202).send({
                                "status": 202,
                                "message": "Magic link has been sent to the email address provided. Please close this page."
                            });
                            console.log(token.id);
                        }
                    });
                }
            }
        }
    });
});

router.post('/register', (req, res, next) => {
    // Takes same parameters as "login" but CREATES them in the DB then sends magic token to confirm.
});

/* MAGIC TOKEN EXCHANGE */
router.post('/token', (req, res, next) => {
    // Exchange magic token for JWT
    // Check token exists, then check user has email - if not, add email to user (acts as a "verified" check) then login.
    let token = escape(req.body.token);
    EmailToken.findById(token, (err, token) => {
        if(err) {
            // Database error!
            console.log("Token error: " + err);
            res.status(500).send({
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            });
        } else if (!token) {
            // No token found!
            res.status(401).send({
                "status": 401,
                "message": "The token was not found."
            });
        } else {
            User.findById(token.user, (err, user) => {
                if(err) {
                    // Database error!
                    console.log("User error: " + err);
                    res.status(500).send({
                        "status": 500,
                        "message": "An unknown error has occurred during user login. Please try again later."
                    });
                } else if (!user) {
                    res.status(401).send({
                        "status": 401,
                        "message": "The user was not found."
                    });
                } else {
                    let tokenExpires = token.createdAt;
                    tokenExpires.setHours(tokenExpires.getHours() + config.magicLinkExpiration);
                    if (Date.now() > tokenExpires) {
                        res.status(401).send({
                            "status": 401,
                            "message": "Token has expired."
                        });
                    } else {
                        if (!user.email.includes(token.email)) {
                            user.email.push(token.email);
                        }
                        jwt.sign('payload', config.jwtPrivateKey, (err, jwtoken) => {
                            if (err) {
                                console.log("JWT error: " + err);
                                res.status(500).send({
                                    "status": 500,
                                    "message": "An unknown error has occurred during token generation. Please try again later."
                                });
                            } else {
                                // GENERATE JWT HERE!!!
                                res.status(200).send({
                                    "status": 200,
                                    "message": "Here is the JWT..."
                                });
                            }
                        });
                    }
                    console.log(Date.now());
                    console.log(tokenExpires);
                    token.remove();
                }
            });
        }
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
