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
      <div className={Styles.title}>{props.name} ({props.count})</div>
    </div>
  );
}
ChannelInfo.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  switchSidebar: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};
