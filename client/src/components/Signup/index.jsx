import React, { PureComponent, PropTypes } from 'react';
import Immutable from 'immutable';
import { autobind } from 'core-decorators';
import { Link } from 'react-router';
import Styles from './Signup.css';

@autobind
export default class Signup extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showErr: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err.get('code')) {
      this.setState({ showErr: true });
    }
  }
  componentDidUpdate() {
    if (this.state.showErr) {
      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.setState({ showErr: false }); }, 2000);
    }
  }
  handleSignup() {
    this.props.signup({
      username: this.username.value.trim(),
      password: this.password.value.trim(),
    });
  }
  render() {
    let err;
    const code = this.props.err.get('code');
    if (code === 3) {
      err = '用户已存在!';
    } else if (code === 4) {
      err = '用户名和密码不能为空!';
    }
    return (
      <div className={Styles.wrap}>
        <div className={Styles.err}>
          <span className={`${Styles.info} ${this.state.showErr ? Styles.show : Styles.hide}`}>{err}</span>
        </div>
        <label
          htmlFor="signupUsername"
          className={Styles.label}
        >
          <i className={`iconfont icon-username ${Styles.icon}`} />
          <input
            ref={(ele) => { this.username = ele; }}
            id="signupUsername"
            type="text"
            className={Styles.input}
            placeholder="username"
          />
        </label>
        <label
          htmlFor="signupPassword"
          className={Styles.label}
        >
          <i className={`iconfont icon-password ${Styles.icon}`} />
          <input
            ref={(ele) => { this.password = ele; }}
            id="signupPassword"
            type="password"
            className={Styles.input}
            placeholder="password"
          />
        </label>
        <input
          type="button"
          className={Styles.submit}
          value="注册"
          onClick={this.handleSignup}
        />
        <Link className={Styles.link} to="/login">已有账号</Link>
      </div>
    );
  }
}
Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  err: PropTypes.instanceOf(Immutable.Map),
};
