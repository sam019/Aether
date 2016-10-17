import { fromJS } from 'immutable';

const initState = fromJS({});
export default function messagesReducer(messages = initState, action) {
  switch (action.type) {
    case 'ADD_MESSAGE': {
      const { timestamp, userName, group, type, content } = action.payload;
      const message = {
        timestamp,
        userName,
        content,
        type,
      };
      if (!messages.get(group)) {
        return messages.set(group, fromJS([message]));
      }
      return messages.updateIn([group], array => array.push(message));
    }
    default:
      return messages;
  }
}
