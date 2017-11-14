const express = require('express');
const app = express();
const config = require('./server.json');

app.use(express.static('public'));

const configRouter = require('./lib/config-router');
app.use('/config', configRouter);

const ingestionRouter = require('./lib/ingestion-router');
app.use('/ingestion', ingestionRouter);

app.listen(config.port, () => console.log('Seaweed started on port 6161.'));
