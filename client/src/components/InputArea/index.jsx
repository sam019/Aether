import React, { Component, PropTypes } from 'react';
import Styles from './InputArea.css';
import { expressions } from '../../assets/Utils';

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
    this.selectExpression = this.selectExpression.bind(this);
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
  selectExpression(e) {
    this.setState({
      content: `${this.state.content}#(${e.target.name})`,
    });
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
          <i className={`iconfont icon-img ${Styles.icon}`} />
        </label>
      );
    }
    const exps = expressions.map((item, index) => (
      <i
        key={item}
        style={{ backgroundPosition: `0 ${-index * 30}px` }}
        data-item={item}
        onClick={this.switchExpressions}
      />
    ));
    return (
      <div className={Styles.wrap} >
        <input
          type="text"
          className={Styles.input}
          value={this.state.content}
          onChange={this.handleChange}
          onKeyDown={this.handleKeydown}
          ref={(ele) => { this.input = ele; }}
        />
        <button
          className={Styles['switch-expressions']}
          onClick={this.switchExpressions}
        >
          <i className={`iconfont icon-expression ${Styles.icon}`} />
        </button>
        {lastButton}
        <div
          style={{ display: !this.state.showExpressions && 'none' }}
          className={Styles.mask}
          onClick={this.switchExpressions}
        >
          <div className={Styles.expressions}>
            {exps}
          </div>
        </div>
      </div>
    );
  }
}
/* InputArea.defaultProps = {
  expressions: expressions.map((item, index) => (
    <i
      style={{ backgroundPosition: `0 ${-index * 30}px` }}
      data-item={item}
      onClick={this.switchExpressions}
    />
  )),
}; */
InputArea.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
