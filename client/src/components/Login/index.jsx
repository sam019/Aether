import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// import Styles from './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  /* componentDidMount() {
    socket.on('loginWithoutToken', ({ token, user }) => {
      localStorage.setItem('token', token);
    });
  } */
  handleUserName(e) {
    this.setState({ userName: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleLogin() {
    const { userName, password } = this.state;
    this.props.login({
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
          onChange={this.handleUserName}
          value={this.state.userName}
        />
        <input
          type="text"
          className=""
          placeholder="请输入密码"
          onChange={this.handlePassword}
          value={this.state.password}
        />
        <input
          type="button"
          className=""
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
