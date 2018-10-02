
//HERE WE ARE GIVING CONFIGURATIONS OF OUR DATABASE
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'https://databases-auth.000webhost.com',
      user : 'id7265702_iot_team',
      password : 'iot@123',
      database : 'id7265702_iot_database'
      // connectionString:process.env.DATABASE_URL,
      // ssl:false
    }
  });

  module.exports = knex;