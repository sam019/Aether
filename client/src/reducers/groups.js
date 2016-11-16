import { fromJS } from 'immutable';

export default function(groups = fromJS([]), action) {
  const payload = action.payload;
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const groupName = payload.groupName;
      let flag = false;
      const nextState = groups.map((group) => {
        if (!flag && group.get('groupName') === groupName) {
          flag = true;
          delete payload.groupName;
          return group.update('messages', fromJS([]), array => array.push(fromJS(payload)));
        }
        return group;
      });
      if (!flag) {
        delete payload.groupName;
        return nextState.push(fromJS({
          groupName,
          isPrivate: true,
          messages: [payload],
        }));
      }
      return nextState;
    }
    case 'SET_GROUPS_INFO': {
      if (!payload) {
        return fromJS([]);
      }
      return fromJS(payload);
    }
    case 'GETTING_HISTORY_MESSAGES': {
      return groups.map((group) => {
        if (group.get('groupName') === payload) {
          return group.set('getting', true);
        }
        return group;
      });
    }
    case 'RECEIVE_HISTORY_MESSAGES': {
      const { groupName, messages } = payload;
      return groups.map((group) => {
        if (group.get('groupName') === groupName) {
          return group
          .update('messages', array => array.unshift(...fromJS(messages)))
          .set('getting', false);
        }
        return group;
      });
    }
    case 'ADD_GROUP_INFO': {
      return groups.push(fromJS(payload));
    }
    default: return groups;
  }
}
