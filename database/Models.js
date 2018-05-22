const Sequelize = require('sequelize');
const { sequelize: db } = require('./index');

// Urls
const Url = db.define('url', {
  url: { type: Sequelize.STRING, unique: true, allowNull: false },
  status: { type: Sequelize.STRING, allowNull: false },
  html: { type: Sequelize.STRING, allowNull: true },
});

module.exports = {
  Url,
};
