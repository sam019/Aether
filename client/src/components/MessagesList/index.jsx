import React, { PureComponent, PropTypes } from 'react';
import Immutable from 'immutable';
import Message from '../Message';
import Styles from './MessagesList.css';

export default class MessageList extends PureComponent {
  constructor(props) {
    super(props);
    this.sate = {
      scrollBottom: 0,
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillReceiveProps(nextProps) {
    const ele = this.ele;
    const scrollBottom = ele.scrollHeight - ele.clientHeight - ele.scrollTop;
    // 滚动条在底部或者新增的是历史消息，保持scrollBottom不变，否者保持scrollTop不变
    if (scrollBottom === 0 || (this.props.getting && !nextProps.getting)) {
      this.setState({ scrollBottom });
    } else {
      this.setState({ scrollBottom: -1 });
    }
  }
  componentDidUpdate() {
    if (this.state.scrollBottom !== -1) {
      this.setScrollBottom();
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  setScrollBottom() {
    const ele = this.ele;
    const scrollTop = parseInt(ele.scrollHeight - ele.clientHeight - this.state.scrollBottom, 10);
    ele.scrollTop = scrollTop;
  }
  handleScroll() {
    const ele = this.ele;
    const scrollTop = ele.scrollTop;
    if (scrollTop === 0 && !this.props.getting) {
      this.props.getHistoryMessages();
    }
  }
  handleResize() {
    const ele = this.ele;
    ele.scrollTop = parseInt(ele.scrollHeight - ele.clientHeight, 10);
  }
  render() {
    let messages = this.props.messages ? this.props.messages.toJS() : [];
    messages = messages.map(item =>
      <Message
        key={item.username + item.timestamp}
        avatar={item.avatar}
        username={item.username}
        date={new Date(item.timestamp).toString().match(/([0-9]{2}:){2}[0-9]{2}/)[0]}
        content={item.content}
        isMine={this.props.username === item.username}
      />
    );
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
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.instanceOf(Immutable.List).isRequired,
  username: PropTypes.string.isRequired,
  getHistoryMessages: PropTypes.func.isRequired,
  getting: PropTypes.bool.isRequired,
};
