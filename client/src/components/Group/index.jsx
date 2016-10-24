import React, { PropTypes } from 'react';
import Styles from './Group.css';

export default function Group(props) {
  return (
    <div className={Styles.wrap}>
      <img src="" alt="" className={Styles['group-avatar']} />
      <p className={Styles['group-name']}>{props.picture}</p>
    </div>
  );
}

Group.propTypes = {
  picture: PropTypes.string,
};
