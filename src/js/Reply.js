import React, { Component } from 'react';

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
