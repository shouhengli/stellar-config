import R from 'ramda';
import { Map, fromJS } from 'immutable';
import actions from '../../../actions';
import { generateClassPropGlobalIndex } from '../../../ingestion-profile';

export const reduceClasses = (state = Map(), action) => {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT:
      return action.classes;

    case actions.CLASS_LIST_ADD_NEW_CLASS: {
      return state.set(action.newClass.get('globalIndex'), action.newClass);
    }

    case actions.CLASS_EDITOR_SAVE_EDIT: {
      return state.map(cls =>
        cls
          .update('props', props => props.map(p => p.set('isEditing', false)))
          .set('isEditingName', false)
      );
    }

    case actions.CLASS_EDITOR_EDIT_CLASS_NAME:
      return state.setIn(
        [action.selectedClass.get('globalIndex'), 'isEditingName'],
        true
      );

    case actions.CLASS_EDITOR_EDIT_ATTRIBUTE:
      return state.setIn(
        [
          action.selectedClass.get('globalIndex'),
          'props',
          action.attribute.get('globalIndex'),
          'isEditing'
        ],
        true
      );

    case actions.CLASS_EDITOR_ADD_NEW_ATTRIBUTE: {
      const globalIndex = generateClassPropGlobalIndex();
      return state.setIn(
        [action.selectedClass.get('globalIndex'), 'props', globalIndex],
        fromJS({
          name: '',
          type: 'string',
          globalIndex,
          isEditing: true
        })
      );
    }

    case actions.CLASS_EDITOR_UPDATE_CLASS_NAME:
      return state.setIn(
        [action.selectedClass.get('globalIndex'), 'name'],
        action.name
      );

    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_NAME:
      return state.setIn(
        [
          action.selectedClass.get('globalIndex'),
          'props',
          action.attribute.get('globalIndex'),
          'name'
        ],
        action.newName
      );

    case actions.CLASS_EDITOR_UPDATE_ATTRIBUTE_TYPE:
      return state.setIn(
        [
          action.selectedClass.get('globalIndex'),
          'props',
          action.attribute.get('globalIndex'),
          'type'
        ],
        action.attrType
      );

    case actions.CLASS_EDITOR_DELETE_ATTRIBUTE:
      return state.setIn(
        [
          action.selectedClass.get('globalIndex'),
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

export const reduceSelectedClassIndex = (state = null, action) => {
  switch (action.type) {
    case actions.CLASS_LIST_CLASS_SELECTED:
      return action.selectedClass.get('globalIndex');

    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return null;

    default:
      return state;
  }
};
