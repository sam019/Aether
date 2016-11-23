import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Group from '../../containers/Group';
import Styles from './GroupsList.css';
import roomURL from '../../assets/default_room.png';

export default function GroupsList(props) {
  const groups = [];
  const username = props.username;
  props.groups && props.groups.forEach((group) => {
    const rawGroupName = group.get('groupName');
    const match = rawGroupName.match(/(.*)&&(.*)/);
    let groupName = rawGroupName;
    let avatar = roomURL;
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
    <div className={Styles.wrap}>
      {groups}
    </div>
  );
}
GroupsList.propTypes = {
  groups: PropTypes.instanceOf(Immutable.List),
  currentGroup: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
