
//HERE WE ARE GIVING CONFIGURATIONS OF OUR DATABASE
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '192.168.43.247:3306',
      user : 'root',
      password : '',
      database : 'iot_health'
      // connectionString:process.env.DATABASE_URL,
      // ssl:false
    }
  });

  module.exports = knex;