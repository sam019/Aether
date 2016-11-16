import React, { PropTypes } from 'react';
import Styles from './Group.css';

export default function Group(props) {
  return (
    <div
      className={Styles.wrap}
      onClick={() => { props.switchCurrentGroup(props.id); }}
      style={{ backgroundColor: props.isSelected ? '#3A3F45' : '' }}
    >
      <img
        src={props.avatar}
        alt={props.groupName.slice(0, 1)}
        className={Styles['group-avatar']}
      />
      <p className={Styles['group-name']}>{props.groupName}</p>
    </div>
  );
}


Group.propTypes = {
  id: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  switchCurrentGroup: PropTypes.func.isRequired,
};
