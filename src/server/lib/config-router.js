const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const store = require('./config-store');

function sendServerError(res) {
  res.sendStatus(500);
}

function sendOk(res) {
  res.sendStatus(200);
}

function sendNotFound(res) {
  res.sendStatus(404);
}

router.get(
  '/',
  (req, res) => store
    .listConfigTypes()
    .then(
      (types) => res.json(types),
      () => sendServerError(res)
    )
);

router.get(
  '/:type/:name',
  (req, res) => store
    .getConfig(req.params.type, req.params.name)
    .then((content) => res.json(content))
    .catch(store.NonexistentKeyError, () => sendNotFound(res))
    .catch(() => sendServerError(res))
);

router.post(
  '/:type/:name',
  (req, res) => store
    .defineConfig(req.params.type, req.params.name, req.body.content)
    .then(() => sendOk(res))
    .catch(() => sendServerError(res))
);

router.delete(
  '/:type/:name',
  (req, res) => store
    .deleteConfig(req.params.type, req.params.name)
    .then(() => sendOk(res))
    .catch(store.NonexistentKeyError, () => sendNotFound(res))
    .catch(() => sendServerError(res))
);

router.get(
  '/:type',
  (req, res) => store
    .listConfigs(req.params.type)
    .then(
      (names) => res.json(names),
      () => sendServerError(res)
    )
);

module.exports = router;
