import P from 'bluebird';
import actions from '../actions';
import { getConfig, postConfig, postGraphSchema, deleteConfig } from '../api';
import { INGESTION_PROFILE_CONFIG_TYPE } from '../ingestion-profile';
import {
  createPersistentClass,
  createPersistentClassLink
} from '../ingestion-profile';
import { saveEdit } from './ui/split-view';

export function load(name, content) {
  return {
    type: actions.INGESTION_PROFILE_LOAD,
    name,
    content
  };
}

export function loadAsync(name) {
  return dispatch =>
    getConfig(INGESTION_PROFILE_CONFIG_TYPE, name).then(content =>
      dispatch(load(name, content))
    );
}

export function saveAsync(name, content) {
  return dispatch =>
    P.try(() => dispatch({ type: actions.INGESTION_PROFILE_SAVE }))
      .then(() => postConfig(INGESTION_PROFILE_CONFIG_TYPE, name, content))
      .then(() => dispatch({ type: actions.INGESTION_PROFILE_SAVE_SUCCESS }));
}

export function saveGraphSchema(profileName, classes, classLinks) {
  const classesToSave = classes.map(c =>
    c.update('props', props => props.filterNot(p => p.get('isDeleted')))
  );
  const classLinksToSave = classLinks.filterNot(l => l.get('isDeleted'));

  return dispatch =>
    postGraphSchema(INGESTION_PROFILE_CONFIG_TYPE, profileName, {
      classes: classesToSave
        .valueSeq()
        .map(c => createPersistentClass(c))
        .toJS(),
      classLinks: classLinksToSave
        .valueSeq()
        .map(l => createPersistentClassLink(l))
        .toJS()
    }).then(() => {
      dispatch(loadGraphSchemaContent(classesToSave, classLinksToSave));
      dispatch(saveEdit());
    });
}

export function reset() {
  return { type: actions.INGESTION_PROFILE_RESET };
}

export function deleteAsync(name) {
  return dispatch =>
    deleteConfig(INGESTION_PROFILE_CONFIG_TYPE, name).then(() =>
      dispatch(reset())
    );
}

export function addSource(source) {
  return {
    type: actions.INGESTION_PROFILE_ADD_SOURCE,
    source
  };
}

export function deleteSource(source) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_SOURCE,
    source
  };
}

export function loadGraphSchemaContent(classes, classLinks) {
  return {
    type: actions.GRAPH_SCHEMA_UPDATE_CONTENT,
    classes,
    classLinks
  };
}

export function addMappingNode(node) {
  return {
    type: actions.INGESTION_PROFILE_ADD_MAPPING_NODE,
    node
  };
}

export function updateMappingNode(node, index) {
  return {
    type: actions.INGESTION_PROFILE_UPDATE_MAPPING_NODE,
    node,
    index
  };
}

export function deleteMappingNode(index) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_MAPPING_NODE,
    index
  };
}

export function addMappingLink(link) {
  return {
    type: actions.INGESTION_PROFILE_ADD_MAPPING_LINK,
    link
  };
}

export function updateMappingLink(link, index) {
  return {
    type: actions.INGESTION_PROFILE_UPDATE_MAPPING_LINK,
    link,
    index
  };
}

export function deleteMappingLink(index) {
  return {
    type: actions.INGESTION_PROFILE_DELETE_MAPPING_LINK,
    index
  };
}
