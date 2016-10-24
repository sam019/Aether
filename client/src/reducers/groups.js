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
      return groups.updateIn([groupName, 'messages'], fromJS([]), array => array.push(message));
    }
    case 'INITIALIZE_GROUP_INFO': {
      const initialMessages = {};
      for (const group of action.payload) {
        initialMessages[group.groupName] = {};
        initialMessages[group.groupName].messages = group.messages;
      }
      return fromJS(initialMessages);
    }
    case 'GETTING_HISTORY_MESSAGES': {
      const groupName = action.payload;
      return groups.setIn([groupName, 'getting'], true);
    }
    case 'RECEIVE_HISTORY_MESSAGES': {
      const { groupName, messages } = action.payload;
      return groups
      .updateIn([groupName, 'messages'], array => array.unshift(...messages))
      .setIn([groupName, 'getting'], false);
    }
    default: return groups;
  }
}
