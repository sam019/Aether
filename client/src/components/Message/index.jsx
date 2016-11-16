import React, { PureComponent, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { autobind } from 'core-decorators';
import Styles from './Message.css';
import { expressions } from '../../assets/Utils';
import sprite from '../../assets/expressions.png';
import UserCard from '../../containers/UserCard';

@autobind
export default class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showUserInfo: false,
      showFullPicture: false,
    };
  }
  componentDidMount() {
    this.wrap.style.maxWidth = `${this.wrap.clientWidth}px`;
  }
  switchUserInfo() {
    this.setState({ showUserInfo: !this.state.showUserInfo });
  }
  switchFullPicture() {
    this.setState({ showFullPicture: !this.state.showFullPicture });
  }
  render() {
    const { avatar, username, date, isMine, type } = this.props;
    let { content } = this.props;
    let src;
    if (type === 'text') {
      content = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
      .replace(/#\(([\u4e00-\u9fa5]+)\)/g, (match, p1) => {
        const index = expressions.indexOf(p1);
        if (index !== -1) {
          return `<img class="${Styles.expression}" style="object-position: 0 ${index * -30}px" src="${sprite}" alt="${p1}" />`;
        }
        return match;
      })
      .replace(/((https?:\/\/)|www\.)[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g, (m, p1, p2) => {
        const href = !p2 ? `http://${m}` : m;
        return `<a class="${Styles.link}" href="${href}" rel="noopener noreferrer" target="_blank">${m}</a>`;
      });
      content = (
        <p
          className={Styles.content}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    } else {
      src = content;
      content = (
        <img
          src={`${src}-thumbnail`}
          alt=""
          className={Styles.picture}
          onLoad={this.props.imgLoad}
          onClick={this.switchFullPicture}
        />
      );
    }
    return (
      <div
        className={Styles.message}
        style={{ direction: isMine ? 'rtl' : 'ltr' }}
      >
        <img
          src={avatar}
          alt={username.slice(0, 1)}
          className={Styles.avatar}
          onClick={this.switchUserInfo}
        />
        <div
          className={Styles.wrap}
          ref={(ele) => { this.wrap = ele; }}
        >
          <div className={Styles.info}>{username} <date>{date}</date></div>
          {content}
        </div>
        {this.state.showUserInfo && (
          <div
            style={{ backgroundColor: 'transparent' }}
            className={Styles.mask}
            onClick={this.switchUserInfo}
          />
        )}
        <ReactCSSTransitionGroup
          component={props => React.Children.toArray(props.children)[0] || null}
          transitionName={{
            enter: Styles.enter,
            enterActive: Styles.enterActive,
            leave: Styles.leave,
            leaveActive: Styles.leaveActive,
          }}
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
        >
          {this.state.showUserInfo && (
            <UserCard
              isMine={this.props.isMine}
              username={this.props.username}
              avatar={this.props.avatar}
              unmount={this.switchUserInfo}
            />
          )}
        </ReactCSSTransitionGroup>
        {this.state.showFullPicture && (
          <img
            src={src}
            alt=""
            className={Styles['full-picture']}
          />
        )}
        {this.state.showFullPicture && (
          <div
            style={{ backgroundColor: 'rgba(9,9,9,0.5)' }}
            className={Styles.mask}
            onClick={this.switchFullPicture}
          />
        )}
      </div>
    );
  }
}
Message.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  imgLoad: PropTypes.func,
};
