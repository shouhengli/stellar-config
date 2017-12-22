import express from 'express';
import bodyParser from 'body-parser';
import * as store from './config-store';
import { sendServerError, sendNotFound, sendOk } from './util';

const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) =>
  store
    .listConfigTypes()
    .then(types => res.json(types), () => sendServerError(res))
);

router.get('/:type/:name', (req, res) =>
  store
    .getConfig(req.params.type, req.params.name)
    .then(content => res.json(JSON.parse(content)))
    .catch(store.NonexistentKeyError, () => sendNotFound(res))
    .catch(e => {
      sendServerError(res);
    })
);

router.post('/:type/:name', (req, res) =>
  store
    .defineConfig(req.params.type, req.params.name, JSON.stringify(req.body))
    .then(() => sendOk(res))
    .catch(() => sendServerError(res))
);

router.post('/:type/:name/graphSchema', (req, res) =>
  store
    .getConfig(req.params.type, req.params.name)
    .then(content => JSON.parse(content))
    .then(content => (content.graphSchema = req.body) && content)
    .then(content =>
      store.defineConfig(
        req.params.type,
        req.params.name,
        JSON.stringify(content)
      )
    )
    .then(() => res.json(req.body))
    .catch(() => sendServerError(res))
);

router.delete('/:type/:name', (req, res) =>
  store
    .deleteConfig(req.params.type, req.params.name)
    .then(() => sendOk(res))
    .catch(store.NonexistentKeyError, () => sendNotFound(res))
    .catch(() => sendServerError(res))
);

router.get('/:type', (req, res) =>
  store
    .listConfigs(req.params.type)
    .then(names => res.json(names), () => sendServerError(res))
);

export default router;
