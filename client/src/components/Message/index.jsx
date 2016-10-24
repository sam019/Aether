import React, { Component, PropTypes } from 'react';
import Styles from './Message.css';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = { showUserInfo: false };
    this.switchUserInfo = this.switchUserInfo.bind(this);
  }
  switchUserInfo() {
    this.setState({ showUserInfo: !this.state.showUserInfo });
  }
  render() {
    const { avatar, username, date, content, isMine } = this.props;
    return (
      <div
        className={Styles.message}
        style={{ direction: isMine ? 'rtl' : 'ltr' }}
      >
        <img
          src={avatar}
          alt="头像"
          className={Styles.avatar}
          onClick={this.switchUserInfo}
        />
        <div className={Styles.wrap}>
          <div className={Styles.info}>{username} <date>{date}</date></div>
          <p className={Styles.content}>{content}</p>
        </div>
      </div>
    );
  }
}
Message.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
};
