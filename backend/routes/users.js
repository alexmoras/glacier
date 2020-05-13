var express = require('express');
var router = express.Router();
const User = require('../models/user');
const userLoader = require('../helpers/user-loader');
const responder = require('../helpers/responder');
const ServiceUser = require('../models/service-user');
const IceUser = require('../models/ice-user');

/*
GET
    /me - returns ice/service profile for logged in user
    /:user - return ice/service profile for specified user

 */

router.get('/:user', (req, res, next) => {
    if(req.params.user === "me"){
        responder.success(res, 200, 200, userLoader.get_all(req.user));
    } else if (userLoader.has_permission(req.user) || req.user.id === req.params.user){
        User.findById(req.params.user)
            .then(user => {
                if(user){
                    responder.success(res, 200, 200, userLoader.get_all(user));
                } else {
                    responder.failure(res, 200, 404, "User does not exist.");
                }
            })
            .catch(err => {
                responder.failure(res, 500, 500, "An error occurred.", err);
            })
    } else {
        responder.failure(res, 401, 401, "Not authorised.", {
            "action": "User attempted to access a resource they do not have access to.",
            "by": req.user.id,
            "on": req.params.user
        });
    }
});


router.put('/:user/ice', (req, res, next) => {
    let requestedUser;
    if(req.params.user === "me"){
        requestedUser = req.user;
    } else {
        requestedUser = req.params.user;
    }
    if(req.params.user === "me" || userLoader.has_staff_permission(req.user) || req.user.id === req.params.user){
        User.findById(requestedUser)
            .then(user => {
                let payload = userLoader.check_ice_payload(req);
                if(user && payload){
                    return userLoader.put_ice(user, payload);
                } else {
                    responder.failure(res, 400, 400, "Bad request. Make sure you are submitting the full payload and the user exists.");
                }
            })
            // Check that there PUT completed and send response.
            .then(ice => {
                if(ice){
                    responder.success(res, 201, 201, ice);
                }
            })
            .catch(err => {
                responder.failure(res, 500, 500, "An error occurred.", err);
            });
    } else {
        responder.failure(res, 401, 401, "Not authorised.", {
            "action": "PUT",
            "url": "/" + req.params.user + "ice",
            "by": req.user.id,
            "on": requestedUser
        });
    }
});

router.put('/:user/service', (req, res, next) => {
    let requestedUser;
    if(req.params.user === "me"){
        requestedUser = req.user;
    } else {
        requestedUser = req.params.user;
    }
    if(req.params.user === "me" || userLoader.has_staff_permission(req.user) || req.user.id === req.params.user){
        User.findById(requestedUser)
            .then(user => {
                let payload = userLoader.check_service_payload(req);
                if(user && payload){
                    return userLoader.put_service(user, payload);
                } else {
                    responder.failure(res, 400, 400, "Bad request. Make sure you are submitting the full payload and the user exists.");
                }
            })
            // Check that there PUT completed and send response.
            .then(service => {
                if(service){
                    responder.success(res, 201, 201, service);
                }
            })
            .catch(err => {
                responder.failure(res, 500, 500, "An error occurred.", err);
            });
    } else {
        responder.failure(res, 401, 401, "Not authorised.", {
            "action": "PUT",
            "url": "/" + req.params.user + "service",
            "by": req.user.id,
            "on": requestedUser
        });
    }
});


module.exports = router;