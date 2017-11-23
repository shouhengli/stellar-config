const express = require('express');
const router = express.Router();
import { getSample } from './ingestion-api';

const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.get('/sample', (req, res) =>
  getSample(req.query.source).then(sample => res.json(sample))
);

module.exports = router;
