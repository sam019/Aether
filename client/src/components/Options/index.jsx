import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Styles from './Options.css';

@autobind
export default class Options extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showInput: false,
      groupName: '',
    };
  }
  /* 切换 组名输入 */
  switchInput(e) {
    e.stopPropagation();
    this.setState({ showInput: !this.state.showInput });
  }
  /* 绑定 */
  syncInput(e) {
    this.setState({ groupName: e.target.value });
  }
  /* 加入群组 */
  joinGroup() {
    const groupName = this.state.groupName.trim();
    if (groupName) {
      this.props.joinGroup(groupName);
    }
    this.props.unmount();
  }
  switchNotification() {
    this.props.changeUserInfo({ allowNotification: !this.props.allowNotification });
  }
  switchSound() {
    this.props.changeUserInfo({ allowSound: !this.props.allowSound });
  }
  render() {
    let notification;
    let notificationClass;
    if (!this.props.allowNotification) {
      notification = '开启桌面通知';
      notificationClass = 'icon-info-off';
    } else {
      notification = '关闭桌面通知';
      notificationClass = 'icon-info-on';
    }
    let sound;
    let soundClass;
    if (!this.props.allowSound) {
      sound = '开启声音';
      soundClass = 'icon-sound-off';
    } else {
      sound = '关闭声音';
      soundClass = 'icon-sound-on';
    }
    return (
      !this.state.showInput ? (
        <ul
          className={Styles.panel}
          onClick={this.props.unmount}
        >
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.switchInput}
            >
              <i className={`iconfont icon-group ${Styles.icon}`} />
              群组
            </button>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.switchNotification}
            >
              <i className={`iconfont ${notificationClass} ${Styles.icon}`} />
              {notification}
            </button>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.switchSound}
            >
              <i className={`iconfont ${soundClass} ${Styles.icon}`} />
              {sound}
            </button>
          </li>
          <li>
            <a
              className={`${Styles.option}`}
              href="https://github.com/sam019/Aether"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`iconfont icon-source ${Styles.icon}`} />
              源码
            </a>
          </li>
          <li>
            <button
              className={`${Styles.option}`}
              onClick={this.props.logout}
            >
              <i className={`iconfont icon-quit ${Styles.icon}`} />
              退出
            </button>
          </li>
        </ul>
      ) : (
        <div
          className={Styles.join}
        >
          <div className={Styles.title}>
            <p className={Styles['title-1']}>请输入群组名</p>
            <p className={Styles['title-2']}>若群组不存在会自动创建</p>
          </div>
          <input
            type="text"
            className={Styles.input}
            value={this.state.groupName}
            onChange={this.syncInput}
            autoFocus
          />
          <input
            type="button"
            className={Styles.confirm}
            value="确认"
            onClick={this.joinGroup}
          />
        </div>
      )
    );
  }
}
Options.propTypes = {
  allowNotification: PropTypes.bool.isRequired,
  allowSound: PropTypes.bool.isRequired,
  unmount: PropTypes.func.isRequired,
  joinGroup: PropTypes.func.isRequired,
  changeUserInfo: PropTypes.func.isRequired,
  /* switchNotification: PropTypes.func.isRequired,
  switchSound: PropTypes.func.isRequired, */
  logout: PropTypes.func.isRequired,
};
