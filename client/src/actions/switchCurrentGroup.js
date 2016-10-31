export default function switchCurrentGroup(groupName) {
  return {
    type: 'SWITCH_CURRENT_GROUP',
    payload: groupName,
  };
}
