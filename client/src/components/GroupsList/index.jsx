import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Group from '../../containers/Group';

const style = {
  flexGrow: 1,
  overflow: 'none',
};

export default function GroupsList(props) {
  const groups = [];
  props.groups.forEach((group) => {
    const groupName = group.get('groupName');
    groups.push(
      <Group
        key={groupName}
        groupName={groupName}
        avatar={group.get('avatar')}
        isSelected={props.currentGroup === groupName}
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
};
