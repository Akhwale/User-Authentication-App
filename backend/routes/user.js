const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { request } = require('express');
const passport = require('passport');

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
      .catch((err) => res.status(400).json('Error: ' + err));
  });
});


// Login Route

// router.route('/login').post((req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.status(401).json( 'Incorrect username or password.');
//     }
//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       req.flash('success', 'Login successful!');
//       return res.json('User authenticated successfully');
         
//     });
//   })(req, res, next);
// });


function errorHandler(err, req, res, next) {
  console.error(err.stack); // Log the error for debugging purposes

  // Determine the status code and error message based on the error type
  let statusCode = err.status || 500;
  let errorMessage = err.message || 'Internal Server Error';

  // Send the error response in JSON format
  res.status(statusCode).json({ error: errorMessage });
}

// Login route
router.route('/login').post((req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err); // Pass the error to the error-handling middleware
    }
    if (!user) {
      return next({ status: 401, message: 'Incorrect username or password.' });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err); // Pass the error to the error-handling middleware
      }
      req.flash('success', 'Login successful!');
      return res.json({ message: 'User authenticated successfully' });
    });
  })(req, res, next);
});

// Error-handling middleware (Should be placed after all routes and middlewares)
router.use(errorHandler);



module.exports = router;

