const request = require('request-promise');
const { fetchPendingJobsFromDatabase, updateJobInDatabse } = require('../database/Queries');

/**
 * When called, goes through every 'pending' job, gets HTML for them
 */
const worker = async () => {
  const pendingJobs = await fetchPendingJobsFromDatabase();

  for (const job of pendingJobs) {
    const { id, url } = job;

    try {
      const html = await request(url);
      updateJobInDatabse({
        id,
        status: 'complete',
        html,
      });
    } catch (err) {
      updateJobInDatabse({
        id,
        status: 'failed',
        html: null,
      });
    }

    request(url)
      .then((html) => {})
      .catch(err => console.log(`Cannot get URL for ${url}`));
  }
};

// Necessary to give outer scope for clearInterval
let timer;

/**
 * Sets worker to get HTML at given time
 * @param {number} time (ms)
 */
const startWorker = (time) => {
  timer = setInterval(worker, time);
};

/**
 * Stops worker
 */
const stopWorker = () => {
  clearInterval(timer);
  timer = null;
};

module.exports = {
  startWorker,
  stopWorker,
};
