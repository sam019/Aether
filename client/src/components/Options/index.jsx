import React, { PropTypes } from 'react';
import Styles from './Options.scss';

export default function Options(props) {
  let notification;
  let notificationClass;
  if (!props.allowNotification) {
    notification = '开启桌面通知';
    notificationClass = Styles['notic-off'];
  } else {
    notification = '关闭桌面通知';
    notificationClass = Styles['notic-on'];
  }
  let sound;
  let soundClass;
  if (!props.allowSound) {
    sound = '开启声音';
    soundClass = Styles['sound-off'];
  } else {
    sound = '关闭声音';
    soundClass = Styles['sound-on'];
  }
  return (
    <div className={Styles.mask} onClick={props.handleDisplayPanel}>
      <ul className={Styles.panel} style={props.location}>
        <li>
          <button
            className={`${Styles.option} ${Styles.chat}`}
            onClick={props.launchChat}
          >发起聊天</button>
        </li>
        <li>
          <button
            className={`${Styles.option} ${notificationClass}`}
            onClick={props.switchNotification}
          >{notification}</button>
        </li>
        <li>
          <button
            className={`${Styles.option} ${soundClass}`}
            onClick={props.switchSound}
          >{sound}</button>
        </li>
        <li>
          <a
            className={`${Styles.option} ${Styles.resource}`}
            href="https://github.com/oddTick/Aether"
            target="_blank"
            rel="noopener noreferrer"
          >源码</a>
        </li>
        <li>
          <button
            className={`${Styles.option} ${Styles.quit}`}
            onClick={props.logout}
          >退出</button>
        </li>
      </ul>
    </div>
  );
}
Options.propTypes = {
  allowNotification: PropTypes.bool.isRequired,
  allowSound: PropTypes.bool.isRequired,
  handleDisplayPanel: PropTypes.func.isRequired,
  location: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }),
  launchChat: PropTypes.func.isRequired,
  switchNotification: PropTypes.func.isRequired,
  switchSound: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};
