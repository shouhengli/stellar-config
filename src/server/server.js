import express from 'express';
import config from './server.json';
import configRouter from './lib/config-router';
import ingestionRouter from './lib/ingestion-router';

const app = express();

app.use(express.static('public'));
app.use('/config', configRouter);
app.use('/ingestion', ingestionRouter);
app.listen(config.port, () =>
  console.log(`Seaweed started on port ${config.port}.`)
);
