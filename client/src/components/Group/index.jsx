import React, { Component, PropTypes } from 'react';
import Styles from './Group.css';

export default class Group extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.switchCurrentGroup(this.props.groupName);
  }
  render() {
    return (
      <div
        className={Styles.wrap}
        onClick={this.handleClick}
        style={{ backgroundColor: this.props.isSelected ? '#3A3F45' : '' }}
      >
        <img
          src={this.props.avatar}
          alt=""
          className={Styles['group-avatar']}
        />
        <p className={Styles['group-name']}>{this.props.groupName}</p>
      </div>
    );
  }
}

Group.propTypes = {
  avatar: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  switchCurrentGroup: PropTypes.func.isRequired,
};
