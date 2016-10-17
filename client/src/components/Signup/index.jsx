import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.synUserName = this.synUserName.bind(this);
    this.synPassword = this.synPassword.bind(this);
    this.synRepeatPassword = this.synRepeatPassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  synUserName(e) {
    this.setState({ userName: e.taget.value });
  }
  synPassword(e) {
    this.setState({ password: e.taget.value });
  }
  synRepeatPassword(e) {
    this.setState({ repeatPassword: e.taget.value });
  }
  handleSignup() {
    /* todo verfify */
    const { userName, password } = this.state;
    this.props.signup({
      userName,
      password,
    });
  }
  render() {
    return (
      <div className="">
        <input
          type="text"
          className=""
          placeholder="请输入用户名"
          onChange={this.synUserName}
          value={this.state.userName}
        />
        <input
          type="text"
          className=""
          placeholder="请输入密码"
          onChange={this.synPassword}
          value={this.state.password}
        />
        <input
          type="text"
          className=""
          placeholder="请再次输入密码"
          onChange={this.synRepeatPassword}
          value={this.state.repeatPassword}
        />
        <input
          type="button"
          className=""
          value="注册"
          onClick={this.handleSignup}
        />
        <Link className="" to="/login">已有账号？立即登录</Link>
      </div>
    );
  }
}
Signup.propTypes = {
  signup: PropTypes.func.isRequired,
};
