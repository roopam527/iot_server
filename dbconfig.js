
//HERE WE ARE GIVING CONFIGURATIONS OF OUR DATABASE
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'iot_health'
    }
  });

  module.exports = knex;