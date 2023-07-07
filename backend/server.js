const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(cors(), express.json());

app.listen(port, ()=>{
    console.log(`You are listening to port ${port}`);
})