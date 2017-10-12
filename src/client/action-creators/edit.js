const api = require('../api');
const actions = require('../actions');

function loadIngestionProfile(configType, configName, configContent) {
  return {
    type: actions.INGESTION_PROFILE_LOAD,
    configType,
    configName,
    configContent,
  };
}

function loadIngestionProfileAsync(configType, configName) {
  return (dispatch) => api
    .getConfig(configType, configName)
    .then((configContent) =>
      dispatch(loadIngestionProfile(configType, configName, configContent))
    );
}

function setEditConfigContent(configContent) {
  return {
    type: actions.EDIT_SET_CONFIG_CONTENT,
    configContent,
  };
}

function setEditConfigStatus(configStatus) {
  return {
    type: actions.EDIT_SET_CONFIG_STATUS,
    configStatus,
  };
}

function resetEditConfig() {
  return {
    type: actions.EDIT_RESET_CONFIG,
  };
}

function saveEditConfigAsync(configType, configName, configContent) {
  return () => api.postConfig(configType, configName, configContent);
}

function revealNewConfig() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_NEW,
  };
}

function hideNewConfig() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_NEW,
  };
}

function setNewConfigName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_NEW_NAME,
    name,
  };
}

function deleteConfigAsync(configType, configName) {
  return () => api.deleteConfig(configType, configName);
}

function revealConfigDelete() {
  return {
    type: actions.INGESTION_PROFILE_REVEAL_DELETE,
  };
}

function hideConfigDelete() {
  return {
    type: actions.INGESTION_PROFILE_HIDE_DELETE,
  };
}

function setConfigDeleteName(name) {
  return {
    type: actions.INGESTION_PROFILE_SET_DELETE_NAME,
    name,
  };
}

module.exports = {
  loadIngestionProfile,
  loadIngestionProfileAsync,
  setEditConfigContent,
  setEditConfigStatus,
  resetEditConfig,
  saveEditConfigAsync,
  revealNewConfig,
  hideNewConfig,
  setNewConfigName,
  revealConfigDelete,
  hideConfigDelete,
  deleteConfigAsync,
  setConfigDeleteName,
};
