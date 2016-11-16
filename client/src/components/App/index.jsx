import React, { PureComponent, PropTypes } from 'react';
import './App.css';

export default class App extends PureComponent {
  componentDidMount() {
    this.props.startListening();
  }
  render() {
    const style = {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif',
      backgroundImage: 'url(https://ooo.0o0.ooo/2016/11/04/581c7cdbe6f64.jpg)',
      backgroundSize: 'cover',
    };
    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.element.isRequired,
  startListening: PropTypes.func.isRequired,
};
