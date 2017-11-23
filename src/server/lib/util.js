const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

export function loadYamlSync(...pathSegments) {
  return yaml.safeLoad(
    fs.readFileSync(path.join(...pathSegments), { encoding: 'utf8' })
  );
}

export function sendServerError(res) {
  res.sendStatus(500);
}

export function sendOk(res) {
  res.sendStatus(200);
}

export function sendNotFound(res) {
  res.sendStatus(404);
}
