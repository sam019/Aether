import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';

let style = {
  maxWidth: 1000,
  maxHeight: 800,
  width: '100%',
  height: '100%',
  margin: '0 auto',
}
export default class App extends React.Component {
  render() {
    return (
      <section style={style}>
        <Sidebar></Sidebar>
      </section>
    )
  }
}
