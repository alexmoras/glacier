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
    let requestedUser;
    if(req.params.user === "me"){
        requestedUser = req.user;
    } else {
        requestedUser = req.params.user;
    }
    if (req.params.user === "me" || userLoader.has_staff_permission(req.user) || req.user.id === req.params.user){
        User.findById(requestedUser)
            .then(user => {
                if(!user){
                    let err = new Error("User was not found.");
                    err.status = 200;
                    throw err;
                }
                return userLoader.get_all(user);
            })
            .then(all => {
                if(all){
                    responder.success(res, 200, 200, all);
                }
            })
            .catch(err => {
                if(err.name === "CastError"){
                    err = new Error("User was not found.");
                    err.status = 200;
                }
                next(err);
            });
    } else {
        let err = new Error("Unauthorized: User " + req.user + " attempted to access a resource " + req.params.user + " they do not have access to.");
        err.status = 401;
        next(err);
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
                if(user){
                    let data = req.body;
                    data.user = user.id;
                    return IceUser.validate(data).then(() => {return data});
                } else {
                    let err = new Error("User was not found.");
                    err.status = 200;
                    throw err;
                }
            })
            .then(data => {
                return userLoader.put_ice(data);
            })
            .then(ice => {
                if(ice){
                    responder.success(res, 201, 201, ice);
                }
            })
            .catch(err => {
                if(err.name === "ValidationError"){
                    let err = new Error("Bad request. Please check the payload and try again.");
                    err.status = 400;
                }
                next(err);
            });
    } else {
        let err = new Error("Unauthorized: User " + req.user + " attempted to access a resource " + req.params.user + " they do not have access to.");
        err.status = 401;
        next(err);
    }
});

router.put('/:user/service', (req, res, next) => {
    let requestedUser;
    if(req.params.user === "me"){
        requestedUser = req.user;
    } else {
        requestedUser = req.params.user;
    }
    if(((req.params.user === "me" || req.user.id === req.params.user) && (userLoader.check_service_email(req.user))) || userLoader.has_staff_permission(req.user)){
        User.findById(requestedUser)
            .then(user => {
                if(user){
                    let data = req.body;
                    data.user = user.id;
                    return ServiceUser.validate(data).then(() => {return data});
                } else {
                    let err = new Error("User was not found.");
                    err.status = 200;
                    throw err;
                }
            })
            .then(data => {
                return userLoader.put_service(data);
            })
            // Check that PUT completed and send response.
            .then(service => {
                if(service){
                    responder.success(res, 201, 201, service);
                }
            })
            .catch(err => {
                if(err.name === "ValidationError"){
                    let err = new Error("Bad request. Please check the payload and try again.");
                    err.status = 400;
                }
                next(err);
            });
    } else {
        let err = new Error("Unauthorized: User " + req.user + " attempted to access a resource " + req.params.user + " they do not have access to.");
        err.status = 401;
        next(err);
    }
});


module.exports = router;