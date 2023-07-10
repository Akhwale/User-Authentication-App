const router = require('express').Router();
const session = require('express-session');
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

// add user

router.route('/add').post((req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json('Error hashing password.');
    }

    const newUser = new User({
      userName,
      password: hashedPassword,
    });

    newUser
      .save()
      .then(() => res.json('User Added Successfully'))
      .catch((err) => res.status(400).json('Error:' + err));
  });
});

module.exports = router;