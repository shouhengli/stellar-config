import R from 'ramda';
import { Map, fromJS } from 'immutable';
import actions from '../../../actions';
import {
  generateClassGlobalIndex,
  generateClassPropGlobalIndex
} from '../../../ingestion-profile';

let selectedClassBackUp = null,
  selectedClassIndex = null;

export const reduceClasses = (state = Map(), action) => {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT:
      return action.classes;

    case actions.CLASS_LIST_CLASS_SELECTED: {
      selectedClassIndex = action.selectedClass.get('globalIndex');
      const next = state
        .map(c => c.set('selected', false))
        .setIn([selectedClassIndex, 'selected'], true);
      selectedClassBackUp = next.get(selectedClassIndex);
      return next;
    }

    case actions.CLASS_EDITOR_CANCEL_EDIT: {
      const selectedClass = state.get(selectedClassIndex);
      if (selectedClass.get('isNew')) {
        const next = state.delete(selectedClassIndex);
        selectedClassBackUp = null;
        selectedClassIndex = null;
        return next;
      } else {
        return state.set(selectedClassIndex, selectedClassBackUp);
      }
    }

    case actions.CLASS_EDITOR_CLOSE_EDIT: {
      const next = state.setIn([selectedClassIndex, 'selected'], false);
      selectedClassBackUp = null;
      selectedClassIndex = null;
      return next;
    }

    case actions.CLASS_LIST_ADD_NEW_CLASS: {
      const globalIndex = generateClassGlobalIndex();
      const next = state.map(c => c.set('selected', false)).set(
        globalIndex,
        fromJS({
          name: 'NewClass',
          props: {},
          globalIndex,
          isEditingName: true,
          selected: true,
          isNew: true
        })
      );
      selectedClassIndex = globalIndex;
      selectedClassBackUp = next.get('globalIndex');
      return next;
    }

    case actions.CLASS_EDITOR_SAVE_EDIT: {
      if (selectedClassIndex) {
        const next = state
          .updateIn([selectedClassIndex, 'props'], props =>
            props.map(p => p.set('isEditing', false))
          )
          .setIn([selectedClassIndex, 'isEditingName'], false);
        selectedClassBackUp = next.get(selectedClassIndex);
        return next;
      }
      return state;
    }

    case actions.CLASS_EDITOR_EDIT_CLASS_NAME:
      return state.setIn([selectedClassIndex, 'isEditingName'], true);

    case actions.CLASS_EDITOR_EDIT_ATTRIBUTE:
      return state.setIn(
        [
          selectedClassIndex,
          'props',
          action.attribute.get('globalIndex'),
          'isEditing'
        ],
        true
      );

    case actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE: {
      const globalIndex = generateClassPropGlobalIndex();
      return state.setIn(
        [selectedClassIndex, 'props', globalIndex],
        fromJS({
          name: '',
          type: 'string',
          globalIndex,
          isEditing: true
        })
      );
    }

    case actions.CLASS_EDITOR_UPDATE_CLASS_NAME:
      return state.setIn([selectedClassIndex, 'name'], action.name);

    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME:
      return state.setIn(
        [
          selectedClassIndex,
          'props',
          action.attribute.get('globalIndex'),
          'name'
        ],
        action.newName
      );

    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE:
      return state.setIn(
        [
          selectedClassIndex,
          'props',
          action.attribute.get('globalIndex'),
          'type'
        ],
        action.attrType
      );

    case actions.CLASS_EDITOR_DELETE_ATTRIBUTE:
      return state.setIn(
        [
          selectedClassIndex,
          'props',
          action.attribute.get('globalIndex'),
          'isDeleted'
        ],
        true
      );

    default:
      return state;
  }
};

export const reduceClassPositions = (state = Map(), action) => {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      return action.classes;

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_POSITION:
      if (state.has(action.globalIndex)) {
        return state
          .setIn(
            [action.globalIndex, 'x'],
            state.getIn([action.globalIndex, 'x']) + action.dx
          )
          .setIn(
            [action.globalIndex, 'y'],
            state.getIn([action.globalIndex, 'y']) + action.dy
          );
      } else {
        return state;
      }

    case actions.GRAPH_SCHEMA_REVEAL_CLASS_PROP_TOOLTIP:
      return state.setIn(
        [action.globalIndex, 'tooltipVisibleProp'],
        action.propName
      );

    case actions.GRAPH_SCHEMA_HIDE_CLASS_PROP_TOOLTIP:
      return R.identical(
        state.getIn([action.globalIndex, 'tooltipVisibleProp']),
        action.propName
      )
        ? state.setIn([action.globalIndex, 'tooltipVisibleProp'], null)
        : state;

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_OUTER_RADIUS:
      return state.setIn(
        [action.globalIndex, 'outerRadius'],
        action.outerRadius
      );
    default:
      return state;
  }
};
