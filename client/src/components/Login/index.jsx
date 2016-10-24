import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Styles from './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  /* componentDidMount() {
    socket.on('loginWithoutToken', ({ token, user }) => {
      localStorage.setItem('token', token);
    });
  } */
  handleUsername(e) {
    this.setState({ username: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin() {
    const { username, password } = this.state;
    this.props.login({
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
          onChange={this.handleUsername}
          value={this.state.username}
        />
        <input
          type="text"
          className={Styles.input}
          placeholder="请输入密码"
          onChange={this.handlePassword}
          value={this.state.password}
        />
        <input
          type="button"
          className={Styles.input}
          value="登录"
          onClick={this.handleLogin}
        />
        <Link className="" to="/signup">没有账号？立即注册</Link>
      </div>
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
};
