const Sequelize = require('sequelize');
const { sequelize: db } = require('./index');

// Urls
const Job = db.define('job', {
  url: { type: Sequelize.STRING, unique: true, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  html: { type: Sequelize.STRING, allowNull: true },
});

db.sync();

module.exports = {
  Job,
};
