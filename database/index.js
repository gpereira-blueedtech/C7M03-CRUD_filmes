// Aqui é onde farei a conexão ao meu banco de dados.

const Sequelize = require("sequelize");

// Aqui é feita a conexão ao meu banco local
// const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USER,process.env.DB_PASS, {
//   host:  process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   dialect: 'postgres'
// });


// Aqui faço a conexão com o banco remoto - Heroku
const sequelize = new Sequelize(process.env.DATABASE_URL, {     
  dialect: 'postgres',
  protocol: 'postgres',     
  dialectOptions: {         
    ssl: {             
      require: true,             
      rejectUnauthorized: false         
    }     
  } 
}) 

module.exports = sequelize;