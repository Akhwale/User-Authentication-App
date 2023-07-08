const express = require('express');
const cors = require('cors'); 
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const uri = process.env.ATLAS_URI;
app.use(cors(), express.json());

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