import React, { Component, PropTypes } from 'react';
import Profile from '../../containers/Profile';
import GroupsList from '../../containers/GroupsList';
import GroupInfo from '../../containers/GroupInfo';
import MessagesList from '../../containers/MessagesList';
import InputArea from '../../containers/InputArea';
import Styles from './App.css';
import socket from '../../socket';
import addMessage from '../../actions/addMessage';

/* function FirstChild(props) {
  let children = React.Children.toArray(props.children);
  return children[0] || null;
} */

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: !this.props.isMobile,
    };
    this.handleSwitchSidebar = this.handleSwitchSidebar.bind(this);
  }
  componentWillMount() {
    const dispatch = this.props.dispatch;
    socket.on('message', (message) => {
      dispatch(addMessage(message));
    });
  }
  componentDidMount() {
    this.rightBox.style.flexBasis = `${this.rightBox.clientWidth}px`;
  }
  componentDidUpdate() {
  }
  componentWillUnmount() {
    socket.on('message', null);
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
App.defaultProps = {
  isMobile: window.innerWidth < 1000,
};
App.propTypes = {
  isMobile: PropTypes.bool.isReruired,
  dispatch: PropTypes.func.isReruired,
};
