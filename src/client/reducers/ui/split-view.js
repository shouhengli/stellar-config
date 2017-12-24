import { combineReducers } from 'redux-immutable';
import graphSchema from './split-view/graph-schema';
import {
  reduceClasses as graphSchemaClasses,
  reduceClassPositions as graphSchemaClassPositions,
  reduceSelectedClassIndex as selectedClassIndex
} from './split-view/graph-schema-classes';
import {
  reduceClassLinks as graphSchemaClassLinks,
  reduceClassLinkPositions as graphSchemaClassLinkPositions
} from './split-view/graph-schema-class-links';

export default combineReducers({
  graphSchema,
  graphSchemaClasses,
  graphSchemaClassPositions,
  graphSchemaClassLinks,
  graphSchemaClassLinkPositions,
  selectedClassIndex
});
