import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Group from '../../containers/Group';

const style = {
  flexGrow: 1,
  overflow: 'scroll',
};

export default function GroupsList(props) {
  const groups = [];
  const username = props.username;
  props.groups && props.groups.forEach((group) => {
    const rawGroupName = group.get('groupName');
    const match = rawGroupName.match(/(.*)&&(.*)/);
    let groupName = rawGroupName;
    let avatar = group.get('avatar');
    if (match) {
      const isLauncher = username === match[1];
      const messages = group.get('messages');
      if (!isLauncher || !avatar) {
        avatar = messages.getIn([0, 'user', 'avatar']);
      }
      groupName = isLauncher ? match[2] : match[1];
    }
    groups.push(
      <Group
        key={rawGroupName}
        id={rawGroupName}
        groupName={groupName}
        avatar={avatar}
        isSelected={props.currentGroup === rawGroupName}
      />
    );
  });
  return (
    <div style={style}>
      {groups}
    </div>
  );
}
GroupsList.propTypes = {
  groups: PropTypes.instanceOf(Immutable.List),
  currentGroup: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
