// unused Component
import React, { Component } from 'react';

class CKEditor extends Component {
  constructor() {
    super();
    this.state = {
      contentInput: '',
    };
  }
  componentDidMount() {
    CKEDITOR.replace('editor', {
      skin: 'moono',
    });
    // this.setInputData();
    const { articleId } = this.props.match.params;
    fetch(`/api/get-posts/${articleId}`)
      .then(res => res.json())
      .then((article) => {
        this.setState({
          contentInput: article.content,
        });
      })
      .then(() => this.setInputData())
      .catch(err => console.error(err));
    CKEDITOR.instances.editor.on('change', () => {
      const data = CKEDITOR.instances.editor.getData();
      console.log(data);
      this.props.editorChange(data);
    });
  }
  setInputData() {
    CKEDITOR.instances.editor.setData(this.state.contentInput);
    // CKEDITOR.instances.editor.setData(this.props.value);
  }
  render() {
    return (
      <textarea
        id="editor"
        // placeholder="content..."
        // value={this.props.defaultValue}
        // onInput={e => this.props.editorInput(e)}
        // onChange={e => this.props.editorChange(e)}
      />
    );
  }
}

export default CKEditor;
