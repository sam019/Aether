import React, { PureComponent, PropTypes } from 'react';
import { autobind } from 'core-decorators';
import Styles from './InputArea.css';
import { expressions } from '../../assets/Utils';

@autobind
export default class InputArea extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      showExpressions: false,
    };
  }
  componentWillMount() {
    this.expressions = expressions.map((item, index) => (
      <i
        key={item}
        style={{ backgroundPosition: `0 ${-index * 30}px` }}
        data-name={item}
        onClick={this.selectExpression}
        title={item}
      />
    ));
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
  switchExpressions(e) {
    e.stopPropagation();
    this.setState({ showExpressions: !this.state.showExpressions });
    this.input.focus();
  }
  selectExpression(e) {
    this.setState({
      content: `${this.state.content}#(${e.target.dataset.name})`,
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
  sendImg(e) {
    const file = e.target.files[0];
    file.type.indexOf('image') !== -1 && this.props.sendMessage({
      timestamp: Date.now(),
      type: 'img',
      content: file,
    });
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
          onChange={this.sendImg}
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
        />
        <div
          className={`${Styles.expressions} ${this.state.showExpressions ? Styles.show : Styles.hidden}`}
          onClick={this.switchExpressions}
        >
          {this.expressions}
        </div>
      </div>
    );
  }
}
InputArea.propTypes = {
  sendMessage: PropTypes.func.isRequired,
};
