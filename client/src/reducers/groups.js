import { fromJS } from 'immutable';

export default function(groups = fromJS({}), action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { timestamp, username, groupName, type, content } = action.payload;
      const message = {
        timestamp,
        username,
        content,
        type,
      };
      return groups.map((group) => {
        if (group.get('groupName') === groupName) {
          return group.update('messages', fromJS([]), array => array.push(fromJS(message)));
        }
        return group;
      });
    }
    case 'INITIALIZE_GROUP_INFO': {
      return fromJS(action.payload);
    }
    case 'GETTING_HISTORY_MESSAGES': {
      const groupName = action.payload;
      return groups.map((group) => {
        if (group.get('groupName') === groupName) {
          return group.set('getting', true);
        }
        return group;
      });
    }
    case 'RECEIVE_HISTORY_MESSAGES': {
      const { groupName, messages } = action.payload;
      return groups.map((group) => {
        if (group.get('groupName') === groupName) {
          return group
          .update('messages', array => array.unshift(...fromJS(messages)))
          .set('getting', false);
        }
        return group;
      });
    }
    default: return groups;
  }
}
