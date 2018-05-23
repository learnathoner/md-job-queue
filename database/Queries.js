const Sequelize = require('sequelize');
const { sequelize: db } = require('./index');
const { Job } = require('./Models');

/**
 * Adds URL to table with 'pending' status if new, returns jobID
 * @param {string} url
 *
 * @return {number} jobID
 */
const addJobToDatabase = async (url) => {
  try {
    const [job, created] = await Job.findOrCreate({
      where: {
        url,
      },
      defaults: { status: 'pending' },
    });

    return job.id;
  } catch (err) {
    console.log(`URL couldn't be added: ${err}`);
    return undefined;
  }
};

/**
 * Returns job details using jobID
 * @param {number} id - jobID
 */
const fetchJobFromDatabase = async (id) => {
  try {
    const { dataValues: job } = await Job.findOne({
      where: { id },
      attributes: ['id', 'url', 'status', 'html'],
    });

    return job;
  } catch (err) {
    console.log(`Error retrieving jobID: ${err}`);
    return undefined;
  }
};

/**
 * Returns all pending jobs
 * @return {array} jobs - jobs with no html
 */
const fetchPendingJobsFromDatabase = async () => {
  const pendingJobs = await Job.findAll({
    where: {
      status: 'pending',
    },
  });
  const formattedPending = pendingJobs.map(job => job.dataValues);

  return formattedPending;
};

/**
 * Updates job in database with new info
 * @param {Object} jobInfo - Contains job ID, status, and html
 */
const updateJobInDatabse = async ({ id, status, html }) => {
  Job.update(
    {
      status,
      html,
    },
    {
      where: {
        id,
      },
    },
  ).then(() => console.log('job updated'));
};

module.exports = {
  addJobToDatabase,
  fetchJobFromDatabase,
  fetchPendingJobsFromDatabase,
  updateJobInDatabse,
};
