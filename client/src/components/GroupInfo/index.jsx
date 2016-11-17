import React, { PropTypes } from 'react';
import Styles from './GroupInfo.css';

export default function ChannelInfo(props) {
  return (
    <div className={Styles.header}>
      <button
        className={Styles.switchButton}
        onClick={props.switchSidebar}
      >
        <i
          className={`iconfont icon-switch ${Styles.icon}`}
          style={{ transform: props.showSidebar ? 'rotate(-45deg)' : '' }}
        />
      </button>
      <div className={Styles.title}>{props.groupName}{/*  ({props.count}) */}</div>
      {props.groupName !== 'Aether' && (
        <button
          className={Styles.leave}
          onClick={props.leaveGroup}
        >
          <i className={`iconfont icon-leave ${Styles.icon}`} />
        </button>
      )}
    </div>
  );
}
ChannelInfo.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  switchSidebar: PropTypes.func.isRequired,
  leaveGroup: PropTypes.func.isRequired,
  groupName: PropTypes.string.isRequired,
  // count: PropTypes.string.isRequired,
};
