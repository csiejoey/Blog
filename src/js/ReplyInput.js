import React from 'react';

function ReplyInput(props) {
  return (
    <div>
      <textarea
        placeholder="user..."
        value={props.user}
        onChange={e => props.editReplyUser(e.target.value)}
      />
      <textarea
        placeholder="content..."
        value={props.content}
        onChange={e => props.editReplyContent(e.target.value)}
      />
      <button
        onClick={() => props.postReply()}
      >
        reply
      </button>
    </div>
    );
}

export default ReplyInput;
