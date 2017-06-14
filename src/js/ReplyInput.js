import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

function ReplyInput(props) {
  return (
    <div>
      <TextField
        floatingLabelText="ｕｓｅｒ..."
        value={props.user}
        onChange={e => props.editReplyUser(e.target.value)}
      />
      <br />
      <TextField
        floatingLabelText="ｃｏｎｔｅｎｔ..."
        multiLine={true}
        rows={3}
        value={props.content}
        onChange={e => props.editReplyContent(e.target.value)}
      />
      <br />
      <RaisedButton
        label="ｒｅｐｌｙ"
        onClick={() => props.postReply()}
      />
    </div>
  );
}

ReplyInput.propTypes = {
  user: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  editReplyUser: PropTypes.func.isRequired,
  editReplyContent: PropTypes.func.isRequired,
  postReply: PropTypes.func.isRequired,
};

export default ReplyInput;
