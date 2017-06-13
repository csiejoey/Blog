import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

class Reply extends Component {
  controlBtn() {
    return (
      <div>
        {/* <button onClick={() => this.editReply(this.props.id)}>edit</button> */}
        <button onClick={() => this.props.removeReply(this.props.id)}>remove</button>
      </div>
    );
  }
  render() {
    const replaceBreak = this.props.replyBody.content.replace(/\r?\n/g, '<br />');
    const replaceBlank = replaceBreak.replace(/&nbsp;/g, ' ');
    return (
      <div>
        <h4>{ReactHtmlParser(replaceBlank)}</h4>
        <h3>{this.props.replyBody.user}--{this.props.replyBody.time}</h3>
        {this.controlBtn()}
      </div>
    );
  }
}

export default Reply;
