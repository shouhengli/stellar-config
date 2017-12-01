import R from 'ramda';
import { fromJS, Map } from 'immutable';
import actions from '../../actions';
import { getClassLinkKey } from '../../ingestion-profile';

const initialState = Map();

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case actions.GRAPH_SCHEMA_UPDATE_CONTENT: {
      return R.reduce(
        (s, l) => s.set(getClassLinkKey(l), fromJS(l)),
        Map(),
        action.classLinks
      );
    }

    case actions.GRAPH_SCHEMA_UPDATE_ELEMENT_POSITIONS:
      if (R.any(l => state.has(getClassLinkKey(l)), action.classLinks)) {
        return R.reduce(
          (s, l) =>
            s
              .setIn([getClassLinkKey(l), 'x'], l.x)
              .setIn([getClassLinkKey(l), 'y'], l.y),
          state,
          action.classLinks
        );
      } else {
        return state;
      }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_POSITION: {
      const classLinkKey = getClassLinkKey({
        name: action.name,
        source: action.source,
        target: action.target
      });
      if (state.has(classLinkKey)) {
        return state
          .setIn(
            [classLinkKey, 'x'],
            state.getIn([classLinkKey, 'x']) + action.dx
          )
          .setIn(
            [classLinkKey, 'y'],
            state.getIn([classLinkKey, 'y']) + action.dy
          );
      }
      return state;
    }

    case actions.GRAPH_SCHEMA_UPDATE_CLASS_LINK_LENGTHS:
      return state.withMutations(mutableState => {
        action.classLinks.forEach(classLink => {
          let classLinkKey = getClassLinkKey(classLink);
          if (mutableState.has(classLinkKey)) {
            mutableState.setIn([classLinkKey, 'length'], classLink.length);
          }
        });
      });

    default:
      return state;
  }
}
