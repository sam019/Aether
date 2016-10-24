export default function(showSidebar, action) {
  switch (action.type) {
    case 'SWITCH_SIDEBAR': return !showSidebar;
    default: return showSidebar;
  }
}
