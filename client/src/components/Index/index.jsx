import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Profile from '../../containers/Profile';
import GroupsList from '../../containers/GroupsList';
import GroupInfo from '../../containers/GroupInfo';
import MessagesList from '../../containers/MessagesList';
import InputArea from '../../containers/InputArea';
import Styles from './Index.css';

@autobind
export default class Index extends PureComponent {
  componentDidMount() {
    // 动画结束后，移除硬件加速，防止干扰fixed定位元素
    this.sidebar.addEventListener('transitionend', this.handleTransition);
    this.rightBox.style.flexBasis = `${this.rightBox.clientWidth}px`;
  }
  componentWillUpdate() {
    // 动画开始时启用硬件加速
    if (this.wrap.style.transform === '') {
      this.wrap.style.transform = 'translateZ(0)';
    }
  }
  componentWillUnmount() {
    this.sidebar.removeEventListener('transitionend', this.handleTransition);
  }
  handleTransition() {
    this.wrap.style.transform = '';
  }
  render() {
    return (
      <div
        className={Styles.wrap}
        ref={(ele) => { this.wrap = ele; }}
      >
        <div
          className={Styles.sidebar}
          style={{ marginLeft: this.props.showSidebar ? 0 : '-280px' }}
          ref={(ele) => { this.sidebar = ele; }}
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
      </div>
    );
  }
}
Index.propTypes = {
  showSidebar: PropTypes.bool.isRequired,
};
