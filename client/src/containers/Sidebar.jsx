import React from 'react';
import {connect} from 'react-redux';
import User from '../components/User';
import ChannelList from './ChannelList';

let style = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'red',
  width: 280,
  height: '100%',
  backgroundColor: '#2e3238',
  color: '#fff'
};

export default class Sidebar extends React.Component {
  render() {
    return (
      <aside style={style} ref={e => this.mine = e}>
        <User name="liangsen"></User>
        <ChannelList></ChannelList>
      </aside>
    );
  }
}

function mapStateToProps(state) {

}

let connectedSidebar = connect()(Sidebar);
