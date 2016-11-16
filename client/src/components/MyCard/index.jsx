import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Styles from './MyCard.css';

@autobind
export default class MyCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      sign: props.sign || '',
      location: props.location || '',
    };
  }
  changeAvatar(e) {
    this.props.changeUserInfo({ avatar: e.target.files[0] });
  }
  switchEdit() {
    this.setState({ editable: !this.state.editable });
  }
  confirm() {
    const sign = this.state.sign.trim();
    const location = this.state.location.trim();
    let newInfo;
    if (sign !== this.props.sign) {
      newInfo = Object.assign({}, { sign });
    }
    if (location !== this.props.location) {
      newInfo = Object.assign({}, newInfo, { location });
    }
    if (newInfo) {
      this.props.changeUserInfo(newInfo);
    }
    this.setState({ editable: !this.state.editable });
  }
  syncSign(e) {
    this.setState({ sign: e.target.value });
  }
  syncLocation(e) {
    this.setState({ location: e.target.value });
  }
  render() {
    return (
      <div className={Styles.card}>
        {!this.state.editable && (
          <label
            htmlFor="avatar"
            className={Styles['avatar-wrap']}
          >
            <input
              style={{ display: 'none' }}
              type="file"
              id="avatar"
              onChange={this.changeAvatar}
            />
            <img
              src={this.props.avatar}
              alt={this.props.username.slice(0, 1)}
              className={Styles.avatar}
            />
          </label>
        )}
        <div className={Styles['info-wrap']}>
          <div className={Styles['name-wrap']}>
            <span className={Styles.name}>{this.props.username}</span>
            {/* <i className={`iconfont ${this.props.male ? 'icon-male' : 'icon-female'}`} /> */}
            <button
              className={Styles.button}
              onClick={!this.state.editable ? this.switchEdit : this.confirm}
            >
              <i className={`iconfont ${!this.state.editable ? 'icon-edit' : 'icon-confirm'} ${Styles.icon}`} />
            </button>
          </div>
          {!this.state.editable ? (
            <div className={Styles.info}>
              <span className={Styles['info-head']}>签名：</span>
              <span className={Styles['info-text']}>{this.props.sign}</span>
            </div>
          ) : (
            <label
              htmlFor="sign"
              className={Styles.info}
            >
              <span className={Styles['info-head']}>签名：</span>
              <input
                id="sign"
                type="text"
                className={Styles['info-input']}
                value={this.state.sign}
                onChange={this.syncSign}
              />
            </label>
          )}
          {!this.state.editable ? (
            <div className={Styles.info}>
              <span className={Styles['info-head']}>位置：</span>
              <span className={Styles['info-text']}>{this.props.location}</span>
            </div>
          ) : (
            <label
              htmlFor="location"
              className={Styles.info}
            >
              <span className={Styles['info-head']}>位置：</span>
              <input
                id="location"
                type="text"
                className={Styles['info-input']}
                value={this.state.location}
                onChange={this.syncLocation}
              />
            </label>
          )}
        </div>
      </div>
    );
  }
}

MyCard.propTypes = {
  username: PropTypes.string,
  avatar: PropTypes.string,
  sign: PropTypes.string,
  location: PropTypes.string,
  changeUserInfo: PropTypes.func.isRequired,
};
