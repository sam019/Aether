import React, { Component, PropTypes } from 'react';
import Styles from './Profile.css';
import Options from '../../containers/Options';
import { getElementTop, getElementLeft } from '../../Utils';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetail: false,
      displayPanel: false,
    };
    this.handleDisplayPanel = this.handleDisplayPanel.bind(this);
    this.handleDisplayDetail = this.handleDisplayDetail.bind(this);
  }
  /**
   * 显示详细信息
   */
  handleDisplayDetail() {
    this.setState({ displayDetail: !this.state.displayDetail });
  }
  /**
   * 显示设置面板
   */
  handleDisplayPanel() {
    if (!this.state.displayPanel) {
      this.setState({
        panelTop: getElementTop(this.ele) + 58,
        panelLeft: getElementLeft(this.ele) + 80,
        displayPanel: true,
      });
    } else {
      this.setState({ displayPanel: false });
    }
  }
  render() {
    return (
      <div className={Styles.card} ref={(ele) => { this.ele = ele; }}>
        <button
          onClick={this.handleDisplayDetail}
          className={Styles.wrap}
        >
          <img
            src=""
            alt="头像"
            className={Styles.portrait}
          />
        </button>
        <span className={Styles['user-name']}>{this.props.username}</span>
        <input
          type="button"
          className={Styles.config}
          onClick={this.handleDisplayPanel}
        />
        {
          /* launchChat={this.props.launchChat}
        switchNotification={this.props.switchNotification}
        switchSound={this.props.switchSound}
        resource={this.props.resource}
        quit={this.props.quit} */}
        {/* allowNotification={this.props.allowNotification}
        allowSound={this.props.allowSound} */}
        {this.state.displayPanel ? <Options
          handleDisplayPanel={this.handleDisplayPanel}
          location={{ top: this.state.panelTop, left: this.state.panelLeft }}
        /> : null
        }
      </div>
    );
  }
}
Profile.propTypes = {
  username: PropTypes.string.isRequired,
};
