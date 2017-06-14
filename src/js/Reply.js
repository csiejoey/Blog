import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import IconButton from 'material-ui/IconButton';
import NavigationCloseIcon from 'material-ui/svg-icons/navigation/close';
import './../css/Reply.css';

class Reply extends Component {
  render() {
    const replaceBreak = this.props.replyBody.content.replace(/\r?\n/g, '<br />');
    const replaceBlank = replaceBreak.replace(/&nbsp;/g, ' ');
    return (
      <div className="reply">
        <div className="top">
          <p>{ReactHtmlParser(replaceBlank)}</p>
          <div className="close">
            <IconButton
              touch={true}
              onClick={() => this.props.removeReply(this.props.id)}
            >
              <NavigationCloseIcon />
            </IconButton>
          </div>
        </div>
        <h4>{this.props.replyBody.user} -- {this.props.replyBody.time}</h4>
      </div>
    );
  }
}

Reply.propTypes = {
  removeReply: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  // replyBody: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     content: PropTypes.String.isRequired,
  //     user: PropTypes.String.isRequired,
  //     time: PropTypes.String.isRequired,
  //   }).isRequired,
  // ).isRequired,
};

export default Reply;
