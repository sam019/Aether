import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';

let style = {
  display: 'flex',
  maxWidth: 1000,
  maxHeight: 760,
  width: '100%',
  height: '100%',
  margin: '0 auto',
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: window.innerWidth >= 1000 ? false : true
    }
  }
  componentDidMount() {
    window.addEventListener('resize', e => this.handleResize());
  }
  handleResize() {
    this.setState({showSidebar: window.innerWidth >= 1000 ? false : true});
  }
  render() {
    let {roomName, messages} = this.props;
    return (
      <div style={style}>
        {!this.state.showSidebar ? <Sidebar></Sidebar> : null}
        <ChatWindow name={roomName} messages={[]}></ChatWindow>
      </div>
    )
  }
}
