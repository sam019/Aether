import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Message from '../Message';

export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.sate = {
      onBottom: true,
    };
  }
  componentDidMount() {
    this.scrollToBottom();
  }
  componentWillReceiveProps() {
    const ele = this.ele;
    /* 若当前滚动条在底部则保持 */
    if (ele.scrollTop === ele.scrollHeight - ele.clientHeight) {
      this.setState({ onBottom: true });
    } else {
      this.setState({ onBottom: false });
    }
  }
  componentDidUpdate() {
    if (this.state.onBottom) {
      this.scrollToBottom();
    }
  }
  /* 滚动到底部 */
  scrollToBottom() {
    const ele = this.ele;
    ele.scrollTop = ele.scrollHeight - ele.clientHeight;
  }
  render() {
    let messages = this.props.messages.toJS();
    messages = messages.map(item =>
      <Message
        key={item.userName + item.timestamp}
        avatar={item.avatar}
        userName={item.userName}
        date={new Date(item.timestamp).toString().match(/([0-9]{2}:){2}[0-9]{2}/)[0]}
        content={item.content}
        isMine={this.props.userName === item.userName}
      />
    );
    // const messages = null;
    return (
      <div
        style={{
          flexGrow: 1,
          overflowY: 'scroll',
          padding: '0 10px',
        }}
        ref={(ele) => { this.ele = ele; }}
      >
        {messages}
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: ImmutablePropTypes.list.isRequired,
  userName: PropTypes.string.isRequired,
};
