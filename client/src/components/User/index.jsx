import React from 'react';
import style from './User.css';
import Options from '../Options';
import {getElementTop, getElementLeft} from '../../Utils';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDetail: false,
      displayPanel: false
    }
  }
  /**
   * 显示详细信息
   */
  handleDisplayDetail(e) {
    if (!this.state.displayDetail) {
      this.setState({displayDetail: true});
    } else {
      this.setState({displayDetail: false});
    }
  }
  /**
   * 显示设置面板
   */
  handleDisplayPanel(e) {
    if (!this.state.displayPanel) {
      this.setState({
        panelTop: getElementTop(this.ele) + 58,
        panelLeft: getElementLeft(this.ele) + 80,
        displayPanel: true
      });
    } else {
      this.setState({displayPanel: false});
    }
  }
  render() {
    return (
      <div className={style.card} ref={ele => this.ele = ele}>
        <img src="" alt="头像" className={style.portrait} onClick={e => this.handleDisplayDetail(e)}/>
        <span className={style.username}>{this.props.name}</span>
        <button className={style.config} onClick={e => this.handleDisplayPanel(e)}></button>
        {!this.state.displayPanel?null:<Options
          className={style.panel}
          handleDisplayPanel={this.handleDisplayPanel}
          launchChat={this.props.launchChat}
          switchNotification={this.props.switchNotification}
          switchSound={this.props.switchSound}
          resource={this.props.resource}
          quit={this.props.quit}
          location={{top: this.state.panelTop, left: this.state.panelLeft}}
          allowNotification={this.props.allowNotification}
          allowSound={this.props.allowSound}
          ></Options>
        }
      </div>
    );
  }
}
