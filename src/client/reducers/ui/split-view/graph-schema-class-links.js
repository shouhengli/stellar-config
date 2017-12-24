import { Map, fromJS } from 'immutable';
import { isNil, contains } from 'ramda';
import actions from '../../../actions';
import { generateClassLinkGlobalIndex } from '../../../ingestion-profile';

export function reduceClassLinks(state = Map(), action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT: {
      return action.classLinks;
    }

    case actions.CLASS_LIST_CLASS_SELECTED: {
      const { selectedClass } = action;
      if (isNil(selectedClass)) {
        return state;
      }
      return state.map(l =>
        l.set(
          'staged',
          contains(selectedClass.get('name'), [
            l.get('source'),
            l.get('target')
          ])
        )
      );
    }

    case actions.CLASS_EDITOR_SAVE_EDIT: {
      return state.map(l => l.set('isEditing', false));
    }

    case actions.CLASS_EDITOR_EDIT_CLASS_LINK:
      return state.setIn(
        [action.classLink.get('globalIndex'), 'isEditing'],
        true
      );

    case actions.CLASS_LIST_ADD_NEW_CLASS:
    case actions.CLASS_EDITOR_CLOSE_EDIT:
      return state.map(l => l.set('staged', false));

    case actions.CLASS_EDITOR_ADD_NEW_LINK: {
      const globalIndex = generateClassLinkGlobalIndex(),
        selectedClassName = action.selectedClass.get('name'),
        selectedClassIndex = action.selectedClass.get('globalIndex');

      return state.set(
        globalIndex,
        fromJS({
          name: '',
          source: selectedClassName,
          sourceIndex: selectedClassIndex,
          target: selectedClassName,
          targetIndex: selectedClassIndex,
          staged: true,
          globalIndex,
          isEditing: true
        })
      );
    }

    case actions.CLASS_EDITOR_DELETE_LINK:
      return state.setIn([action.link.get('globalIndex'), 'isDeleted'], true);

    case actions.CLASS_EDITOR_UPDATE_LINK_NAME:
      return state.setIn(
        [action.link.get('globalIndex'), 'name'],
        action.newName
      );

    case actions.CLASS_EDITOR_UPDATE_LINK_SOURCE:
      return state
        .setIn(
          [action.link.get('globalIndex'), 'source'],
          action.newSource.get('name')
        )
        .setIn(
          [action.link.get('globalIndex'), 'sourceIndex'],
          action.newSource.get('globalIndex')
        );

    case actions.CLASS_EDITOR_UPDATE_LINK_TARGET:
      return state
        .setIn(
          [action.link.get('globalIndex'), 'target'],
          action.newTarget.get('name')
        )
        .setIn(
          [action.link.get('globalIndex'), 'targetIndex'],
          action.newTarget.get('globalIndex')
        );

    default:
      return state;
  }
}

export const reduceClassLinkPositions = (state = Map(), action) => {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      return action.classLinks;

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION: {
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
      }
      return state;
    }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS:
      return state.withMutations(mutableState => {
        action.classLinks.forEach(l => {
          if (mutableState.has(l.get('globalIndex'))) {
            mutableState.setIn(
              [l.get('globalIndex'), 'length'],
              l.get('length')
            );
          }
        });
      });

    default:
      return state;
  }
};
