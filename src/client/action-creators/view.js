const actions = require('../actions');

function change(view) {
  return {
    type: actions.VIEW_CHANGE,
    view,
  };
}

module.exports = {
  change,
};
