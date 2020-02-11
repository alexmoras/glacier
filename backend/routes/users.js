var express = require('express');
var router = express.Router();
const User = require('../models/user');
const IceUser = require('../models/ice-user');
const ServiceUser = require('../models/service-user');
const merge = require('merge');

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.status(200).send({
        "success": true,
        "status": 200,
        "message": "Yes, this is working as expected! At the moment, we don't return ALL users - that would be silly. " +
            "So for now, this is the response until the search queries are implemented here."
    })
});

/* GET INDIVIDUAL USER */
router.get('/me', (req, res, next) => {
    let json = {
        user: req.user.id,
        email: req.user.email,
    };
    // Display my user details including ice/service profiles.
    if (req.user.isService) {
        ServiceUser.findOne({user: req.user.id})
            .then((serviceuser) => {
                if (serviceuser) {
                    json["staffID"] = serviceuser.staffID;
                    json["rank"] = serviceuser.rank;
                }
                res.status(200).send({
                    "success": true,
                    "status": 200,
                    "user": json
                });
            })
            .catch((err) => { console.log(err) });
    } else {
        IceUser.findOne({user: req.user.id})
            .then((iceuser) => {
                if (iceuser) {
                    json["forename"] = iceuser.forename;
                    json["surname"] = iceuser.surname;
                    json["dob"] = iceuser.dob;
                    json["phone"] = iceuser.phone;
                    json["address"] = iceuser.address;
                    json["medical"] = iceuser.medical;
                    json["contacts"] = iceuser.contacts;
                }
                res.status(200).send({
                    "success": true,
                    "status": 200,
                    "user": json
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }
});

/* GET INDIVIDUAL USER */
router.get('/:user', (req, res, next) => {
  User.findById(req.params.user)
      .then((user) => {
          if(! user) {
              throw new Error("User Not Found");
          }
          let json = {
              user: user.id,
              email: user.email,
          };
          // Display my user details including ice/service profiles.
          if (user.isService) {
              ServiceUser.findOne({user: user.id})
                  .then((serviceuser) => {
                      if (serviceuser) {
                          json["staffID"] = serviceuser.staffID;
                          json["rank"] = serviceuser.rank;
                      }
                      res.status(200).send({
                          "success": true,
                          "status": 200,
                          "user": json
                      });
                  })
                  .catch((err) => { console.log(err) });
          } else {
              IceUser.findOne({user: user.id})
                  .then((iceuser) => {
                      if (iceuser) {
                          json["forename"] = iceuser.forename;
                          json["surname"] = iceuser.surname;
                          json["dob"] = iceuser.dob;
                          json["phone"] = iceuser.phone;
                          json["address"] = iceuser.address;
                          json["medical"] = iceuser.medical;
                          json["contacts"] = iceuser.contacts;
                      }
                      res.status(200).send({
                          "success": true,
                          "status": 200,
                          "user": json
                      });
                  })
                  .catch((err) => {
                      console.log(err)
                  });
          }
      })
      .catch((err) => { res.send(err) });
});

/* CREATE OR UPDATE ICE PROFILE */
router.put('/me/profile', (req, res, next) => {
    IceUser.findOne({user: req.user.id})
        .then((iceuser) => {
            if (!iceuser) {
                iceuser = new IceUser();
            }
            iceuser.user = req.user.id;
            iceuser.forename = req.body.forename;
            iceuser.surname = req.body.surname;
            iceuser.dob = req.body.dob;
            iceuser.phone = req.body.phone;
            iceuser.medical = req.body.medical;
            iceuser.contacts = req.body.contacts;
            iceuser.address = req.body.address;
            iceuser.save()
                .then(() => {
                    res.status(201).send({
                        "success": true,
                        "status": 201,
                        "message": "The profile has been updated.",
                        "profile": iceuser
                    })
                })
                .catch((err) => {
                    res.status(500).send({
                        "success": false,
                        "status": 500,
                        "message": err
                    })
                });
        })
        .catch((err) => {
            res.status(500).send({
                "success": false,
                "status": 500,
                "message": err
            })
        });
  /* ICE PROFILE */

});

/* CREATE OR UPDATE SERVICE PROFILE */
router.put('/me/service', (req, res, next) => {
  /* ICE PROFILE */
});

/* DELETE USER */
router.delete('/:user', (req, res, next) => {
  /* DELETES user and all associated profiles. Does NOT delete anything in the ActionLog. */
});

module.exports = router;
