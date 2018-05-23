const Sequelize = require('sequelize');
const { sequelize: db } = require('./index');

/**
 * Jobs table
 *  structure: id | url | status | html
 */
const Job = db.define('job', {
  url: { type: Sequelize.STRING, unique: true, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  html: { type: Sequelize.TEXT, allowNull: true },
});

db.sync();

module.exports = {
  Job,
};
