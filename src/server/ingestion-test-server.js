const R = require('ramda');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/sampler/do-sample', (req, res) => {
  console.log(`Requesting for sample from ${req.query.file}.`);
  const sample = {
    headers: R.compose(R.unnest, R.repeat)(['ID', 'Name', 'Age'], 10),
    rows: R.repeat(
      R.compose(R.unnest, R.repeat)([1, 'John Snow', '32'], 10),
      req.query.samples
    ),
  };

  res.json(sample);
});

const config = require('./server.json').ingestion;
app.listen(
  config.port,
  () => console.log(`Ingestion test server started on port ${config.port}.`)
);
