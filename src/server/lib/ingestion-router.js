const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const api = require('./ingestion-api');

router.get('/sample', (req, res) => {
  api.getSample(req.query.sourceUri).then((sample) => res.json(sample));
});

module.exports = router;
