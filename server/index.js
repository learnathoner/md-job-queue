const express = require('express');
const bodyParser = require('body-parser');
const { sequelize: db } = require('../database/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

/**
 * Post new jobs
 * @param {Object} req.body - contains JSON { url: jobURL }
 *
 * @return {number} jobID
 */
app.post('/jobs', (req, res) => {
  const { url } = req.body;
  // TODO: Check if url valid input. Normalize url structure?
  // Try adding URL to db, if already in there return jobID
  const jobID = ''; /* jobID from db */
  res.send(jobID);
});

app.get('/', (req, res) => {
  res.send('default');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});
