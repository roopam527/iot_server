const express = require('express');
const router = express.Router();

//IMPORTING DATABASE CONFIGURATION FROM dbconfig.js
var knex = require('../dbconfig');

//HERE WE ARE SENDING ALL DATA FROM THE DATABASE (IN body_temperature TABLE)  TO THE FRONTEND HELP OF GET REQUEST 
//WE ARE ACCEPTING REQUEST BY LOOKING AT hash PRSESENT IN THE URL 
router.get('/:hash',(req,res)=>{
   
    knex('body_temperature').where({
        //HERE WE ARE SENDING ALL DATA THAT ARE STORED IN DATABASE (IN body_temperature TABLE) WITH HELP OF THAT SPECIFIC hash  
        hash:req.params.hash
        })
        .select('temperature','date_and_time')
        .then((response)=>{
                if(response.length > 0){
                    if(response.length > 10){
                        response = response.splice(response.length-10,response.length-1)
                        
                    }
                //IF THERE IS SOME DATA THEN WE WILL SEND THAT DATA TO THE FRONTEND
                data=response.map((index)=>{
                    return index['temperature'];
                })
                labels=response.map((index)=>{
                    const date_and_time = String(index['date_and_time']).substring(0,24);
                    return date_and_time;
                })
                    res.status(200).json({data:data,labels:labels})
                }
                else
                { 
                    //IF THERE IS NO DATA THEN WE WILL SEND THE ERROR 
                   return res.status(400).json({
                    message:"No entry Found !!"
                    })
                }

        })
        .catch((err)=>{
            //HERE WE ARE ARE HANDLING IF THERE IS SOME PROBLEM WHILE INTERACTING WITH DATABASE
            res.status(400).json({
                message:"No entry Found"
            })
        })
})


//HERE WE ARE RECIEVING DATA AND THE ID/HASH OF THE PIC CONTROLLER 
router.get('/:id/:temp', function (req, res) {

    //THEN WE ARE STORING THE RECIEVED DATA IN THE URL TO OUR DATABASE IN temperature TABLE    
    knex('body_temperature').insert(
                      {
                        hash:req.params.id,
                        temperature: req.params.temp
                      }
                    )
      .then(()=>{
        res.send('Temperature was successfully stored in the database')
      })
    .catch((err)=>{
        //HANDLING ERROR RECIEVED FROM DATABASE
      res.send("Error")
    })
})


module.exports = router;