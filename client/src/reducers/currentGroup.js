export default function(currentGroup = 'Aether', action) {
  switch (action.type) {
    case 'SWITCH_CURRENT_GROUP': return action.payload;
    case 'RESET_CURRENT_GROUP': return 'Aether';
    default: return currentGroup;
  }
}
