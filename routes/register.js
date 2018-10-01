const express = require('express');
const router = express.Router();

//IMPORTING DATABASE CONFIGURATION FROM dbconfig.js
const knex = require('../dbconfig');

//IMPORTING FUNCTION FOR ENCRYPTING OUR PASSWORDS BEFORE SENDING TO THE DATABASE
const bcrypt = require("bcrypt-nodejs");

//IMPORTING THE FUNCTION FOR SENDING EMAIL FROM THE sendEmail.js
const sendEmail = require('../functions/sendEmail')



//HERE WE ARE HANDLING ALL REQUEST COMING TO THE ip-address/register TO REGISTER A NEW USER
router.post('/',(req,res) =>{
    //HERE WE ARE ENCRYPTING EMAIL TO MAKE AN UNIQUE ID/API_KEY FOR EACH USER
    const hash = bcrypt.hashSync(req.body.email).replace("/","-");

    //HERE WE ARE ENCRYPTING PASSWORD BEFORE STORING THEM TO DATABASE
    const passwordhash= bcrypt.hashSync(req.body.password)

    //HERE WE ARE STORING NEW USER TO THE DATABASE
    knex('users').insert({
                        email: req.body.email,
                        password:passwordhash,
                        hash:hash
                        })
    .then(()=>{
       //HERE WE ARE SENDING API KEY TO EMAIL OF THE NEW USER 
        sendEmail(req.body.email,
                    'IOT -- Health care API key',
                    "Hello, " + req.body.email + " Your API Key is - " + hash
                );
        //HERE WE SEND USER EMAIL AND API KEY TO THE FRONTEND
        res.status(200).json({
            email:req.body.email,
            hash:hash
        })
    })
    .catch((err)=>{
        //HERE WE SEND AN ERROR IF THE USER IS ALREADY EXIST IN THE DATABASE
        res.status(404).send({

            message:"User Already exist",
            error:err
        });
    })
})



module.exports = router;