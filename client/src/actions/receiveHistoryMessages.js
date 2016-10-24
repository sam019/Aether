export default function receiveHistoryMessages(payload) {
  return {
    type: 'RECEIVE_HISTORY_MESSAGES',
    payload,
  };
}
