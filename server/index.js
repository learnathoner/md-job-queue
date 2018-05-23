const express = require('express');
const bodyParser = require('body-parser');
const { sequelize: db } = require('../database/index');
const { addJobToDatabase, fetchJobFromDatabase } = require('../database/Queries');
const { startWorker, stopWorker } = require('../utils/worker');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.get('/test-stop', (req, res) => {
  console.log('running stoo');
  stopWorker();
});

/**
 * Post new job
 * @param {Object} req.body - contains JSON { url: jobURL }
 *
 * @return {string} jobID
 */
app.post('/jobs', async (req, res) => {
  let { url } = req.body;
  const checkUrlRegex = /^www.\S+/g;

  if (checkUrlRegex.test(url)) {
    url = `http://${url}`;
  }
  // TODO: Check if url valid input. Normalize url structure?
  const jobID = await addJobToDatabase(url);
  // Error handling
  res.status(200).send(String(jobID));
});

/**
 * Get job by id
 * @param {number} query:id - jobID
 *
 * @return {Object} job - JSON with { id: , status: , html: }
 */
app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const job = await fetchJobFromDatabase(id);
  res.status(200).send(job);
});

app.get('/*', (req, res) => {
  res.status(404).send('Not a valid endpoint');
});

const port = process.env.PORT || 3000;

startWorker(2000);

app.listen(port, () => {
  console.log('listening on port 3000!');
});
