import React, { Component, PropTypes } from 'react';
import Profile from '../../containers/Profile';
import GroupsList from '../../containers/GroupsList';
import GroupInfo from '../../containers/GroupInfo';
import MessagesList from '../../containers/MessagesList';
import InputArea from '../../containers/InputArea';
import Styles from './Index.css';
import socket from '../../socket';

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: !this.props.isMobile,
    };
    this.handleSwitchSidebar = this.handleSwitchSidebar.bind(this);
  }
  componentDidMount() {
    this.rightBox.style.flexBasis = `${this.rightBox.clientWidth}px`;
    socket.on('message', (message) => {
      this.props.addMessage(message);
    });
  }
  handleSwitchSidebar() {
    this.setState({ showSidebar: !this.state.showSidebar });
  }
  render() {
    return (
      <div className={Styles.app}>
        <div
          className={Styles.sidebar}
          style={{ marginLeft: this.state.showSidebar ? 0 : '-280px' }}
        >
          <Profile />
          <GroupsList />
        </div>
        <div
          className={Styles['right-box']}
          ref={(ele) => { this.rightBox = ele; }}
        >
          <GroupInfo handleSwitch={this.handleSwitchSidebar} />
          <MessagesList />
          <InputArea />
        </div>
      </div>
    );
  }
}
Index.defaultProps = {
  isMobile: window.innerWidth < 1000,
};
Index.propTypes = {
  isMobile: PropTypes.bool.isReruired,
  addMessage: PropTypes.func.isReruired,
};
