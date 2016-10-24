import React, { Component, PropTypes } from 'react';
import Styles from './InputArea.css';

export default class InputArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      showExpressions: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.switchExpressions = this.switchExpressions.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.sendText = this.sendText.bind(this);
  }
  handleKeydown(e) {
    if (this.state.content && e.key === 'Enter') {
      this.sendText();
    }
  }
  handleChange(e) {
    this.setState({
      content: e.target.value,
    });
  }
  switchExpressions() {
    this.setState({ showExpressions: !this.state.showExpressions });
  }
  sendText() {
    this.props.sendMessage({
      timestamp: Date.now(),
      type: 'text',
      content: this.state.content.trim(),
    });
    this.setState({ content: '' });
    this.input.focus();
  }
  render() {
    let lastButton;
    if (this.state.content) {
      lastButton = (
        <input
          type="button"
          className={Styles['send-text']}
          onClick={this.sendText}
          value="发送"
        />
      );
    } else {
      lastButton = (
        <label
          htmlFor="file"
          className={Styles['send-img']}
          onClick={this.sendImg}
        >
          <input
            id="file"
            type="file"
            style={{ display: 'none' }}
          />
        </label>
      );
    }
    return (
      <footer className={Styles.wrap} >
        <input
          type="text"
          className={Styles.input}
          value={this.state.content}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          ref={(ele) => { this.input = ele; }}
        />
        <input
          type="button"
          className={Styles['switch-expressions']}
          onClick={this.switchExpressions}
        />
        {
          /* this.state.showExpressions ?
            <div className={Styles.expressions}>angry</div>
          : null */
        }
        {lastButton}
      </footer>
    );
  }
}
InputArea.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
