const request = require('request-promise');
const { fetchPendingJobsFromDatabase, updateJobInDatabse } = require('../database/Queries');

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

let timer;

const startWorker = (time) => {
  timer = setInterval(worker, time);
};

const stopWorker = () => {
  clearInterval(timer);
};

module.exports = {
  startWorker,
  stopWorker,
};
