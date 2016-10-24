import React, { PropTypes } from 'react';
import Styles from './GroupInfo.css';

export default function ChannelInfo(props) {
  return (
    <header className={Styles.header}>
      <input
        type="button"
        className={Styles.switchButton}
        onClick={props.switchSidebar}
        style={{ backgroundColor: props.showSidebar ? 'red' : 'green' }}
      />
      <div className={Styles.title}>{props.name} ({props.count})</div>
    </header>
  );
}
ChannelInfo.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
  switchSidebar: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};
