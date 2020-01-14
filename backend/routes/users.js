var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  let org = req.query.org;  // Allow us to filter by organisation.
  let type = req.query.type;  // Allow us to filter by user type (ice, service, etc)


  // This search can only be performed by a user with a SERVICE profile.
  res.send('respond with a resource');
});

/* GET INDIVIDUAL USER */
router.get('/:user', (req, res, next) => {
  // Display all user details including ice/service profiles.
});

/* UPDATE USER */
router.put('/:user', (req, res, next) => {
  // Allows updating of profiles, must be different requests
  // If user adds an email, register it in "Email Token" table and send the email.
});

/* CREATE ICE PROFILE */
router.post('/:user/profile', (req, res, next) => {
  /* ICE PROFILE */
});

/* CREATE SERVICE PROFILE */
router.post('/:user/service', (req, res, next) => {
  /* ICE PROFILE */
});

/* DELETE USER */
router.delete('/:user', (req, res, next) => {
  /* DELETES user and all associated profiles. Does NOT delete anything in the ActionLog. */
});

module.exports = router;
