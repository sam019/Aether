import React, { PureComponent, PropTypes } from 'react';
import Styles from './App.css';

export default class App extends PureComponent {
  componentDidMount() {
    this.props.startListening();
  }
  render() {
    return (
      <div className={Styles.wrap}>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.element.isRequired,
  startListening: PropTypes.func.isRequired,
};
