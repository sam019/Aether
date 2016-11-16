export default function setGroupsInfo(groups) {
  for (const group of groups) {
    group.messages.reverse();
  }
  return {
    type: 'SET_GROUPS_INFO',
    payload: groups,
  };
}
