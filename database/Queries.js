const Sequelize = require('sequelize');
const { sequelize: db } = require('./index');
const { Job } = require('./Models');

/**
 * Takes URL string, either adds to table with 'pending status' or fetches id
 * @param {string} url
 *
 * @return {number} jobID
 */
const ADD_URL = async (url) => {
  try {
    const [job, created] = await Job.findOrCreate({
      where: {
        url,
      },
      defaults: { status: 'pending' },
    });

    return job.id;
  } catch (e) {
    console.log(`URL couldn't be added: ${e}`);
  }
};

module.exports = {
  ADD_URL,
};
