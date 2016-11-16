export default function(showSidebar = window.innerWidth > 1024, action) {
  switch (action.type) {
    case 'SWITCH_SIDEBAR': return !showSidebar;
    case 'RESET_SIDEBAR': return window.innerWidth > 1024;
    default: return showSidebar;
  }
}
