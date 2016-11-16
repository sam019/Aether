import React, { PureComponent, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { autobind } from 'core-decorators';
import Styles from './Profile.css';
import MyCard from '../../containers/Mycard';
import Options from '../../containers/Options';

@autobind
export default class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayDetail: false,
      displayPanel: false,
      displayInput: false,
      groupName: '',
    };
  }
  // 显示详细信息
  handleDisplayDetail() {
    this.setState({ displayDetail: !this.state.displayDetail });
  }
  // 显示设置面板
  handleDisplayPanel() {
    this.setState({ displayPanel: !this.state.displayPanel });
  }
  render() {
    const { avatar, username } = this.props;
    return (
      <div className={Styles.card} ref={(ele) => { this.ele = ele; }}>
        <img
          src={avatar}
          alt={username.slice(0, 1)}
          className={Styles.portrait}
          onClick={this.handleDisplayDetail}
        />
        <span className={Styles['user-name']}>{username}</span>
        <button
          className={Styles.config}
          onClick={this.handleDisplayPanel}
        >
          <i className={`iconfont icon-down ${Styles.icon}`} />
        </button>
        <div
          style={{ display: this.state.displayPanel || this.state.displayDetail ? 'block' : 'none' }}
          className={Styles.mask}
          onClick={this.state.displayPanel ? this.handleDisplayPanel : this.handleDisplayDetail}
        />
        <ReactCSSTransitionGroup
          component={props => React.Children.toArray(props.children)[0] || null}
          transitionName={{
            enter: Styles.enter,
            enterActive: Styles.enterActive,
            leave: Styles.leave,
            leaveActive: Styles.leaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {this.state.displayDetail && <MyCard />}
        </ReactCSSTransitionGroup>
        {this.state.displayPanel && <Options
          unmount={this.handleDisplayPanel}
        />}
      </div>
    );
  }
}
Profile.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};
