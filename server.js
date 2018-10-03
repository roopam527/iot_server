var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sendEmail = require('../functions/sendEmail')


//HANDLING CORS ERROR
app.use(cors());




//FOR USING DATA RECIEVED FROM A POST A REQUEST
app.use(bodyParser.urlencoded({
  extended:false//if we set true there it means to parse data with some automatically generated extra content in it
}));
app.use(bodyParser.json());


// TAKING SPACE FROM AN ONLINE SERVER USING process.env.PORT AND SETTING PORT 8000 AS A DEFAULT
const PORT = process.env.PORT || 8000;
sendEmail("roopamg777@gmail.com","Your port number is here",PORT)

//IMPORTING FUNCTIONS INSIDE login.js
const login = require('./routes/login');

//IMPORTING FUNCTIONS INSIDE register.js
const register = require('./routes/register');

//IMPORTING FUNCTIONS INSIDE temperature.js
const temperature = require('./routes/temperature');

//IMPORTING FUNCTIONS INSIDE body_temperature.js
const body_temperature = require('./routes/body_temperature');

//IMPORTING FUNCTIONS INSIDE pulse.js
const pulse = require('./routes/pulse');


//HANDLING ALL REQUESTS TOWARD IP-ADDRESS/login
app.use('/login',login);

//HANDLING ALL REQUESTS TOWARD IP-ADDRESS/register
app.use('/register',register);

//HANDLING ALL REQUESTS TOWARD IP-ADDRESS/temperature
app.use('/temperature',temperature);

//HANDLING ALL REQUESTS TOWARD IP-ADDRESS/body_temperature
app.use('/body_temperature',body_temperature);


//HANDLING ALL REQUESTS TOWARD IP-ADDRESS/pulse
app.use('/pulse',pulse);

//TAKING SPACE FOR RUN OUR SERVER
app.listen(PORT,()=>console.log("Server is running at " + PORT))