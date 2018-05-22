const Sequelize = require('sequelize');

// TODO: Create DB if not exists
const database = 'Mike';
const sequelize = new Sequelize({
  database,
  host: process.env.PGHOST,
  username: process.env.PGUSER,
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
