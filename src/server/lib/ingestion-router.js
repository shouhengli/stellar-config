const R = require('ramda');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/sample', (req, res) => {
  console.log(`Requesting for sample from ${req.query.sourceUri}.`);
  const sample = {
    headers: R.compose(R.unnest, R.repeat)(['ID', 'Name', 'Age'], 10),
    rows: R.repeat(
      R.compose(R.unnest, R.repeat)([1, 'John Snow', '32'], 10),
      25
    ),
  };

  res.json(sample);
});

module.exports = router;
