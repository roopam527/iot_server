
//HERE WE ARE GIVING CONFIGURATIONS OF OUR DATABASE
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'http://iacc706.000webhostapp.com',
      user : 'id7265702_iot_team',
      password : 'iot@123',
      database : 'id7265702_iot_database'
    }
  });

  module.exports = knex;