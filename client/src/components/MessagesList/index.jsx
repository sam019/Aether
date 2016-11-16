import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Immutable from 'immutable';
import Message from '../Message';
import Styles from './MessagesList.css';

const notiQue = [];

@autobind
export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollBottom: 0,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setScrollBottom();
  }
  componentWillReceiveProps(nextProps) {
    const ele = this.ele;
    const props = this.props;
    const scrollBottom = ele.scrollHeight - ele.clientHeight - ele.scrollTop;
    const isHistorial = props.getting && !nextProps.getting;
    const otherGroup = nextProps.groupName !== props.groupName;
    if (
      !isHistorial &&
      !otherGroup &&
      props.messages &&
      nextProps.messages.size > props.messages.size &&
      document.hidden
    ) {
      if (Notification && nextProps.allowNotification) {
        if (Notification.permission === 'default') {
          Notification.requestPermission();
        }
        let icon;
        const newMessage = nextProps.messages.get(-1);
        const username = newMessage.get('username');
        nextProps.usersInfo.forEach((user) => {
          if (user.get('username') === username) {
            icon = user.get('avatar');
          }
        });
        if (notiQue.length >= 3) {
          const noti = notiQue.shift();
          clearTimeout(noti.timeout);
          noti.close();
        }
        const notification = new Notification(`${username}:`, {
          icon,
          body: newMessage.get('type') === 'text' ? newMessage.get('content') : '[图片]',
        });
        notification.timeout = setTimeout(notification.close.bind(notification), 5000);
        notiQue.push(notification);
      }
      if (nextProps.allowSound) {
        this.sound.play();
      }
    }
    // 滚动条在底部或者新增的是历史消息，保持scrollBottom不变，否者保持scrollTop不变
    if ((scrollBottom === 0 || isHistorial) && !otherGroup) {
      this.setState({ scrollBottom });
    } else if (otherGroup) {
      this.setState({ scrollBottom: 0 });
    } else {
      this.setState({ scrollBottom: -1 });
    }
  }
  componentDidUpdate() {
    this.state.scrollBottom !== -1 && this.setScrollBottom();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  setScrollBottom(e) {
    const ele = this.ele;
    const scrollBottom = this.state.scrollBottom;
    // 当作为事件处理函数时，只有滚动条在底部时保持
    if (!e || (e && scrollBottom === 0)) {
      const scrollTop = parseInt(ele.scrollHeight - ele.clientHeight - scrollBottom, 10);
      ele.scrollTop = scrollTop;
    }
  }
  handleScroll() {
    const ele = this.ele;
    const scrollTop = ele.scrollTop;
    if (scrollTop === 0 && ele.scrollHeight > ele.clientHeight && !this.props.getting) {
      this.props.getHistoryMessages();
    }
  }
  handleResize() {
    const ele = this.ele;
    ele.scrollTop = parseInt(ele.scrollHeight - ele.clientHeight, 10);
  }
  render() {
    const messages = [];
    this.props.messages && this.props.messages.forEach((item) => {
      const user = item.get('user');
      const username = user.get('username');
      const isMine = this.props.username === username;
      messages.push(
        <Message
          key={`${username}-${item.get('timestamp')}`}
          avatar={isMine ? this.props.avatar : user.get('avatar')}
          username={username}
          date={new Date(item.get('timestamp')).toString().match(/([0-9]{2}:){2}[0-9]{2}/)[0]}
          type={item.get('type')}
          content={item.get('content')}
          isMine={isMine}
          imgLoad={this.setScrollBottom}
        />
      );
    });
    return (
      <div
        className={Styles.wrap}
        ref={(ele) => { this.ele = ele; }}
        onScroll={this.handleScroll}
      >
        <i
          style={{ display: !this.props.getting ? 'none' : '' }}
          className={`${Styles.loading} iconfont icon-loading`}
        />
        {messages}
        <audio
          src="http://101.96.8.164/data3.huiyi8.com/2014/lxy/05/14/10.mp3"
          style={{ display: 'none' }}
          ref={(ele) => { this.sound = ele; }}
        />
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.instanceOf(Immutable.List),
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  getHistoryMessages: PropTypes.func.isRequired,
  getting: PropTypes.bool,
};
