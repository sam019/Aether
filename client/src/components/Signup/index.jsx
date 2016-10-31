import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Styles from './Signup.css';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
    };
    this.synUsername = this.synUsername.bind(this);
    this.synPassword = this.synPassword.bind(this);
    this.synRepeatPassword = this.synRepeatPassword.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }
  synUsername(e) {
    this.setState({ username: e.target.value });
  }
  synPassword(e) {
    this.setState({ password: e.target.value });
  }
  synRepeatPassword(e) {
    this.setState({ repeatPassword: e.target.value });
  }
  handleSignup() {
    const { username, password } = this.state;
    this.props.signup({
      username,
      password,
    });
  }
  render() {
    return (
      <div className={Styles.wrap}>
        <input
          type="text"
          className={Styles.input}
          placeholder="请输入用户名"
          onChange={this.synUsername}
          value={this.state.username}
        />
        <input
          type="text"
          className={Styles.input}
          placeholder="请输入密码"
          onChange={this.synPassword}
          value={this.state.password}
        />
        <input
          type="text"
          className={Styles.input}
          placeholder="请再次输入密码"
          onChange={this.synRepeatPassword}
          value={this.state.repeatPassword}
        />
        <input
          type="button"
          className={`${Styles.input} ${Styles.signup}`}
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
