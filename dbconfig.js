
//HERE WE ARE GIVING CONFIGURATIONS OF OUR DATABASE
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'sql12.freesqldatabase.com',
      user : 'sql12259448',
      password : 'f54NVBeQTC',
      database : 'sql12259448'
      // connectionString:process.env.DATABASE_URL,
      // ssl:false
    }
  });

  module.exports = knex;