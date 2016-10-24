export default function initializeGroupsInfo(groups) {
  return {
    type: 'INITIALIZE_GROUP_INFO',
    payload: groups,
  };
}
