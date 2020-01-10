var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

/* LOGIN HANDLER */
router.post('/login', (req, res, next) => {
    let email = escape(req.body.email);
    User.findOne({ email: [email] }, (err, user) => {
        if (err) {
            // Database error!
            console.log("Login error: " + err);
            res.status(500).send({
                "status": 500,
                "message": "An unknown error has occurred during user login. Please try again later."
            });
        } else {
            if(!user){
                // No user found!
                res.status(401).send({
                    "status": 401,
                    "message": "The email and password combination was not recognised. Please check and try again."
                });
            } else {
                bcrypt.compare(req.body.password, user.hash, (err, msg) => {
                    if (err) {
                        // Password hashing error
                        console.log("Password error occurred: " + err);
                        res.status(500).send({
                            "status": 500,
                            "message": "An unknown error has occurred during user login. Please try again later."
                        });
                    } else if (!msg) {
                        // Hashes did not match - FAILURE!
                        res.status(401).send({
                            "status": 401,
                            "message": "The email and password combination was not recognised. Please check and try again."
                        });
                    } else {
                        // Hashes match - SUCCESS!
                        res.status(200).send({
                            "status": 200,
                            "message": "User has successfully logged in.",
                            "user": {
                                "email": user.email
                            }
                        });
                    }
                })
            }
        }
    })
});

/* REGISTER HANDLER */
router.post('/register', (req, res, next) => {
    let email = escape(req.body.email);
    User.findOne({ email: [email] }, (err, user) => {
        if (err) {
            // Database error!
            res.status(500).send({
                "status": 500,
                "message": "An unknown error has occurred during user creation. Please try again later."
            });
        } else if (user) {
            // Email already exists!
            // We return 200 here because we don't want bots being able to work out if an email is valid or not.
            res.status(200).send({
                "status": 409,
                "message": "An account with this email already exists."
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                let user = new User();
                user.email = email;
                user.hash = hash;
                user.save((err) => {
                    if (err) {
                        // An error occurred with user creation!
                        res.status(500).send({
                            "status": 500,
                            "message": "An unknown error has occurred during user creation. Please try again later."
                        });
                    } else {
                        res.status(201).send({
                            "status": 201,
                            "message": "User has been created.",
                            "user": {
                                "email": user.email
                            }
                        });
                    }
                });
            });
        }
    });
});

/* SSO HANDLER */
router.get('/sso', function (req, res, next) {
    // This handler is a little bit different. The Oauth2 flow redirects to here, token is exchanged, the JWT is set
    // in local storage here, user is redirected to the client and we're golden!
    res.send("SSO");
});

/* LOGOUT HANDLER */
// Doesn't exist as users logout by deleting the JWT from local storage.

module.exports = router;
