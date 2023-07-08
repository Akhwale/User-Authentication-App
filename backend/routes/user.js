const router = require('express').Router();

let User = require('../models/user.model');

// add user

router.route('/add').post((req,res)=>{
    const userName = req.body.userName;
    const password = req.body.password;

    const newUser = new User(
        {userName, password}
    );

    newUser.save()
    .then(()=> res.json("User Added Successfully"))
    .catch(err=>res.status(400).json("Error:" + err));
});

module.exports = router;