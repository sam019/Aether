import React, { PropTypes } from 'react';
import Styles from './GroupInfo.css';

export default function ChannelInfo(props) {
  return (
    <header className={Styles.header}>
      <input
        type="button"
        className={Styles.switchButton}
        onClick={props.handleSwitch}
        value="121212"
      />
      <div className={Styles.title}>{props.name} ({props.count})</div>
    </header>
  );
}
ChannelInfo.propTypes = {
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  handleSwitch: PropTypes.func.isRequired,
};
