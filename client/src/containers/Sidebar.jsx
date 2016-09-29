import React from 'react';
import {connect} from 'react-redux';
import User from '../components/User';

let style = {
  backgroundColor: 'red',
  width: '30%',
  maxWidth: 280,
  backgroundColor: '#2e3238',
  color: '#fff'
};

export default class Sidebar extends React.Component {
  render() {
    return (
      <aside style={style} ref={e => this.mine = e}>
        <User name="liangsen"></User>
      </aside>
    );
  }
}

function mapStateToProps(state) {

}

let connectedSidebar = connect()(Sidebar);
