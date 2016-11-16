import React, { PropTypes } from 'react';
import Styles from './UserCard.css';

export default function UserCard(props) {
  if (props.sign === undefined) {
    props.getUserInfo(props.username);
  }
  return (
    <div className={Styles.card}>
      <img
        src={props.avatar}
        alt={props.username.slice(0, 1)}
        className={Styles.avatar}
      />
      <div className={Styles['info-wrap']}>
        <div className={Styles['name-wrap']}>
          <span className={Styles.name}>{props.username}</span>
          {!props.isMine && (
            <button
              className={Styles.button}
              onClick={() => {
                props.launchChat(props.username, props.avatar);
                props.unmount();
              }}
            >
              <i className={`iconfont icon-chat ${Styles.icon}`} />
            </button>
          )}
        </div>
        <div className={Styles.info}>
          <span className={Styles['info-head']}>签名：</span>
          <span className={Styles['info-text']}>{props.sign}</span>
        </div>
        <div className={Styles.info}>
          <span className={Styles['info-head']}>位置：</span>
          <span className={Styles['info-text']}>{props.location}</span>
        </div>
      </div>
    </div>
  );
}
UserCard.propTypes = {
  isMine: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  sign: PropTypes.string,
  location: PropTypes.string,
  launchChat: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  unmount: PropTypes.func.isRequired,
};
