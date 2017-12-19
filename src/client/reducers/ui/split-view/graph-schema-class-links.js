import { Map, fromJS } from 'immutable';
import { isNil, contains } from 'ramda';
import actions from '../../../actions';
import { generateClassLinkGlobalIndex } from '../../../ingestion-profile';

let stagedClassLinksBackUp = null;

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
      const next = state.map(l =>
        l.set(
          'staged',
          contains(selectedClass.get('name'), [
            l.get('source'),
            l.get('target')
          ])
        )
      );
      stagedClassLinksBackUp = next.filter(l => l.get('staged'));
      return next;
    }

    case actions.CLASS_EDITOR_SAVE_EDIT: {
      const next = state.map(l => l.set('isEditing', false));
      stagedClassLinksBackUp = next.filter(l => l.get('staged'));
      return next;
    }

    case actions.CLASS_EDITOR_EDIT_CLASS_LINK:
      return state.setIn(
        [action.classLink.get('globalIndex'), 'isEditing'],
        true
      );

    case actions.CLASS_LIST_ADD_NEW_CLASS:
    case actions.CLASS_EDITOR_CLOSE_EDIT: {
      stagedClassLinksBackUp = null;
      return state.map(l => l.set('staged', false));
    }

    case actions.CLASS_EDITOR_CANCEL_EDIT:
      return state.merge(stagedClassLinksBackUp);

    case actions.CLASS_EDITOR_ADD_NEW_LINK: {
      const globalIndex = generateClassLinkGlobalIndex(),
        selectedClassName = action.selectedClass.get('name');

      return state.set(
        globalIndex,
        fromJS({
          name: '',
          source: selectedClassName,
          target: selectedClassName,
          staged: true,
          globalIndex,
          isEditing: true
        })
      );
    }

    case actions.CLASS_EDITOR_DELETE_LINK:
      return state.delete(action.classLink.get('globalIndex'));

    case actions.CLASS_EDITOR_UPDATE_LINK_NAME:
      return state.setIn(
        [action.classLink.get('globalIndex'), 'name'],
        action.name
      );

    case actions.CLASS_EDITOR_UPDATE_LINK_SOURCE:
      return state.setIn(
        [action.classLink.get('globalIndex'), 'source'],
        action.source
      );

    case actions.CLASS_EDITOR_UPDATE_LINK_TARGET:
      return state.setIn(
        [action.classLink.get('globalIndex'), 'target'],
        action.target
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
