export default function addMessage(message) {
  return {
    type: 'ADD_MESSAGE',
    payload: message,
  };
}
