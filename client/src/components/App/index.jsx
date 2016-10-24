import React, { PropTypes } from 'react';

export default function App(props) {
  const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, 微软雅黑, Arial, sans-serif',
  };
  return (
    <div style={style}>
      {props.children}
    </div>
  );
}
App.propTypes = {
  children: PropTypes.element.isRequired,
};
