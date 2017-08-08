const express = require('express');
const router = express.Router();
const store = require('./config-store');

function sendServerError(res) {
  res.sendStatus(500);
}

router.get(
  '/source/:name',
  (req, res) => store
    .getSourceDef(req.param.name)
    .then(
      (def) => res.json(def),
      () => sendServerError(res)
    )
);

module.exports = router;
