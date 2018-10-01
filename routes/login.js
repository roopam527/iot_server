const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt-nodejs");
var knex = require('../dbconfig');

//HERE WE ARE LOGIN THE EXISTING USER
router.post('/',(req,res) =>{
    //CHECKING IF ENTERED email IS PRESENT IN THE DATABASE OR NOT
    knex('users').where({
        email:req.body.email 
      }).select('email','hash','password')
      .then((response)=>{
        if(response.length > 0)
        {
            //CHECKING IF ENTERED PASSWORD IS MATCH WITH THE DCRYPTED VERSION OF PASSWORD STORED IN DATABASE
            if(bcrypt.compareSync(req.body.password,response[0]['password'])){
            
                return res.status(200).json({
                    //HERE WE ARE RETURNING THE USER EMAIL AND THERE HASH TO THE FRONTEND IF THE PASSWORD IS MATCH
                    email:response[0]['email'],
                    hash:response[0]['hash']
                })
            }
            else
                return res.status(400).json({
                    //IF PASSWORD ISN'T MATCH THEN WE ARE RETURNING AN ERROR
                    message:"Invalid Entry"
                })
        }
        else
            return res.status(404).json({
                //HERE WE ARE RETURNING ERROR IF THE USER DOESN'T EXIST
                message:"User Couldn't exist"
            })

      })
      .catch((err)=>{
          res.status(404).json({
              //HERE WE ARE RETURNING ERROR IF THERE IS SOME PROBLEM WHILE INTERACTING WITH DATABASE
              message:"User Couldn't exist",
              error:err
          })
      })
})


module.exports = router;