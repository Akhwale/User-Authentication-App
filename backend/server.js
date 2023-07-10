const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const session = require('express-session');


const app = express();
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;
app.use(cors(), express.json());



app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());
app.use(passport.session());





const User = require('./models/user.model');


passport.use(
  new LocalStrategy((username, password, done)=>{
    User.findOne({userName:username}, (err, user)=>{
      if(err){
        return done(err);
      }
      if (!user){
        return done(null, false, {message: 'Incorrect username.'});
      }
      
      bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
          return done(null, user);
        }
        else{
          return done(null, false, {message: "Wrog password"})
        }

      })

    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});


const usersRouter = require('./routes/user');

app.use('/user', usersRouter);


// Make connection
mongoose.connect(uri, {useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connection.once('open', ()=>{
    console.log('Connected to the database Successful');
});

app.listen(port, ()=>{
    console.log(`You are listening to port ${port}`);
});