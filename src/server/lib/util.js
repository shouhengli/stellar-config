const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadYamlSync(...pathSegments) {
  return yaml.safeLoad(
    fs.readFileSync(path.join(...pathSegments), {encoding: 'utf8'})
  );
}

function sendServerError(res) {
  res.sendStatus(500);
}

function sendOk(res) {
  res.sendStatus(200);
}

function sendNotFound(res) {
  res.sendStatus(404);
}

module.exports = {
  loadYamlSync,
  sendNotFound,
  sendOk,
  sendServerError,
};
