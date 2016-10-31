import React, { Component, PropTypes } from 'react';
import Profile from '../../containers/Profile';
import GroupsList from '../../containers/GroupsList';
import GroupInfo from '../../containers/GroupInfo';
import MessagesList from '../../containers/MessagesList';
import InputArea from '../../containers/InputArea';
import Styles from './Index.css';

export default class Index extends Component {
  componentDidMount() {
    this.rightBox.style.flexBasis = `${this.rightBox.clientWidth}px`;
    this.props.initializeAndListening();
  }
  render() {
    return (
      <div className={Styles.app}>
        <div
          className={Styles.sidebar}
          style={{ marginLeft: this.props.showSidebar ? 0 : '-280px' }}
        >
          <Profile />
          <GroupsList />
        </div>
        <div
          className={Styles['right-box']}
          ref={(ele) => { this.rightBox = ele; }}
        >
          <GroupInfo />
          <MessagesList />
          <InputArea />
        </div>
        <div
          style={{ display: !this.props.showMask && 'none' }}
          className={Styles.mask}
          onClick={() => {
            this.props.maskClickHandle();
            this.props.switchMask();
          }}
        />
      </div>
    );
  }
}
Index.propTypes = {
  initializeAndListening: PropTypes.func.isRequired,
  showSidebar: PropTypes.bool.isRequired,
};
