const express = require('express');
const bodyParser = require('body-parser');
const { sequelize: db } = require('../database/index');
const { addJobToDatabase, fetchJobFromDatabase } = require('../database/Queries');
const { startWorker, stopWorker } = require('../utils/worker');
const { formatUrl } = require('../utils/helpers');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

/**
 * ========= ROUTES ========
 *
 * POST /jobs - Post new job
 * GET /jobs/:id - Get job info by id
 *
 * =========================
 */

app.post('/jobs', async (req, res) => {
  const { url } = req.body;
  const formattedUrl = formatUrl(url);

  const jobID = await addJobToDatabase(formattedUrl);

  if (jobID) {
    res.status(200).send(String(jobID));
  } else {
    res.status(400).send('ID could not be added');
  }
});

app.get('/jobs/:id', async (req, res) => {
  const { id } = req.params;
  const job = await fetchJobFromDatabase(id);

  if (job) {
    res.status(200).send(job);
  } else {
    res.status(400).send('Job ID not found');
  }
});

app.get('/*', (req, res) => {
  res.status(404).send('Not a valid endpoint');
});

// Starts service worker with a 2000ms interval
startWorker(2000);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});
