const express = require('express');
const bodyParser = require('body-parser');
const { sequelize: db } = require('./database/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('listening on port 3000!');
});
