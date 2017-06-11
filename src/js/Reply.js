import React, { Component } from 'react';

class Reply extends Component {
  removeReply() {

  }
  controlBtn() {
    return (
      <div>
        <button onClick={() => this.editReply()}>edit</button>
        <button onClick={() => this.removeReply()}>remove</button>
      </div>
    );
  }
  render() {
    return (
      <div>
        <h4>{this.props.replyBody.content}</h4>
        <h3>{this.props.replyBody.user}--{this.props.replyBody.time}</h3>
        {this.controlBtn()}
      </div>
    );
  }
}

export default Reply;
