const R = require('ramda');
const P = require('bluebird');
const request = require('superagent');
const actions = require('../actions');

function loadEditConfig(configType, configName, configContent) {
  return {
    type: actions.LOAD_EDIT_CONFIG,
    configType,
    configName,
    configContent,
  };
}

function loadEditConfigAsync(configType, configName) {
  return (dispatch) => new P(
    (resolve, reject) => {
      request.get(`/config/${configType}/${configName}`)
             .accept('json')
             .end((error, response) => {
               if (R.isNil(error)) {
                 resolve(response.body);
               } else {
                 reject(error);
               }
             });
    }
  ).then((configContent) =>
    dispatch(loadEditConfig(configType, configName, JSON.parse(configContent)))
  );
}

function setEditConfigContent(configContent) {
  return {
    type: actions.SET_EDIT_CONFIG_CONTENT,
    configContent,
  };
}

function setEditConfigStatus(configStatus) {
  return {
    type: actions.SET_EDIT_CONFIG_STATUS,
    configStatus,
  };
}

function resetEditConfig() {
  return {
    type: actions.RESET_EDIT_CONFIG,
  };
}

function saveEditConfigAsync(configType, configName, configContent) {
  return (dispatch) => new P(
    (resolve, reject) => {
      request.post(`/config/${configType}/${configName}`)
             .send({content: JSON.stringify(configContent)})
             .end((error, response) => {
               if (R.isNil(error)) {
                 resolve();
               } else {
                 reject(error);
               }
             });
    }
  );
}

function revealNewConfig() {
  return {
    type: actions.REVEAL_NEW_CONFIG,
  };
}

function hideNewConfig() {
  return {
    type: actions.HIDE_NEW_CONFIG,
  };
}

function setNewConfigType(configType) {
  return {
    type: actions.SET_NEW_CONFIG_TYPE,
    configType,
  };
}

function setNewConfigName(configName) {
  return {
    type: actions.SET_NEW_CONFIG_NAME,
    configName,
  };
}

function deleteConfigAsync(configType, configName) {
  return (dispatch) => new P(
    (resolve, reject) => {
      request.delete(`/config/${configType}/${configName}`)
             .end((error, response) => {
               if (R.isNil(error)) {
                 resolve();
               } else {
                 reject(error);
               }
             });
    }
  );
}

function revealConfigDelete() {
  return {
    type: actions.REVEAL_CONFIG_DELETE,
  };
}

function hideConfigDelete() {
  return {
    type: actions.HIDE_CONFIG_DELETE,
  };
}

function setConfigDeleteName(configName) {
  return {
    type: actions.SET_CONFIG_DELETE_NAME,
    configName,
  };
}

module.exports = {
  loadEditConfig,
  loadEditConfigAsync,
  setEditConfigContent,
  setEditConfigStatus,
  resetEditConfig,
  saveEditConfigAsync,
  revealNewConfig,
  hideNewConfig,
  setNewConfigType,
  setNewConfigName,
  revealConfigDelete,
  hideConfigDelete,
  deleteConfigAsync,
  setConfigDeleteName,
};
