const Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize({
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: null,
  dialect: 'postgres',
});

// Verify connection made
const startSequelize = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database!');
  } catch (err) {
    console.error('Unable to connect to the database: ', err);
  }
};

startSequelize();

exports.sequelize = sequelize;
