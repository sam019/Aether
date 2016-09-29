import React from 'react';
import style from './User.css';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayPanel: false,
      displayDetail: false
    };
    this.handleDisplayDetail = this.handleDisplayDetail.bind(this);
    this.handleDisplayPanel = this.handleDisplayPanel.bind(this);
  }
  handleDisplayDetail(e) {
    e.preventDefault();
    if (!this.state.displayDetail) {
      this.setState({displayDetail: true});
    } else {
      this.setState({displayDetail: false});
    }
  }
  handleDisplayPanel(e) {
    e.preventDefault();
    if (!this.state.displayPanel) {
      this.setState({displayPanel: true});
    } else {
      this.setState({displayPanel: false});
    }
  }
  render() {
    let notification, notificationClass;
    if (!this.props.allowDeskNotification) {
      notification = '开启桌面通知';
      notificationClass = style.notic_off;
    }
    let sound, soundClass;
    if (!this.props.allowSoundNotification) {
      sound = '开启声音';
      soundClass = style.sound_off;
    }
    return (
      <div className={style.card}>
        <img src="" alt="头像" className={style.portrait} onClick={this.handleDisplayDetail}/>
        <span className={style.username}>{this.props.name}</span>
        <button className={style.config} onClick={this.handleDisplayPanel}></button>
        {
          !this.state.displayPanel ? null : (
            <ul className={style.panel}>
              <li><button className={style.chat} onClick={this.props.launchChat}>发起聊天</button></li>
              <li><button className={notificationClass} onClick={this.props.switchNotification}>{notification}</button></li>
              <li><button className={soundClass} onClick={this.props.switchSound}>{sound}</button></li>
              <li><button className={style.feedback} onClick={this.props.feedback}>意见反馈</button></li>
              <li><button className={style.quit} onClick={this.props.quit}>退出</button></li>
            </ul>
          )
        }
      </div>
    )
  }
}
