const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function loadYamlSync(...pathSegments) {
  return yaml.safeLoad(
    fs.readFileSync(path.join(...pathSegments), {encoding: 'utf8'})
  );
}

module.exports = {
  loadYamlSync,
};
