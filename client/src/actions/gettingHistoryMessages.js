export default function gettingHistoryMessages(groupName) {
  return {
    type: 'GETTING_HISTORY_MESSAGES',
    payload: groupName,
  };
}
