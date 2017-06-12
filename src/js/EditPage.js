import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';
// import CKEditor from './CKEditor';

class EditPage extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: '',
      contentInput: '',
      authorInput: '',
      inputDirty: false,
      reply: [],
      articleId: '',
    };
  }
  componentDidMount() {
    CKEDITOR.replace('editor', {
      skin: 'moono',
    });
    const { articleId } = this.props.match.params;
    fetch(`/api/get-posts/${articleId}`)
      .then(res => res.json())
      .then((article) => {
        this.setState({
          titleInput: article.title,
          contentInput: article.content,
          authorInput: article.author,
          inputDirty: true,
          reply: article.reply,
          articleId: article._id,
        });
      })
      .then(() => this.setInputData())
      .catch(err => console.error(err));
    CKEDITOR.instances.editor.on('change', () => {
      const data = CKEDITOR.instances.editor.getData();
      console.log(data);
      this.setState({
        contentInput: data,
      });
    });
  }
  setInputData() {
    CKEDITOR.instances.editor.setData(this.state.contentInput);
    // CKEDITOR.instances.editor.setData(this.props.value);
  }
  setInputDirty(e) {
    const isDirty = !!e.target.value.trim();
    this.setState({ inputDirty: isDirty });
  }
  // if unchanged, compard with db => free to cancel
  saveArticle() {
    fetch(`/api/edit/${this.state.articleId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titleInput,
        content: this.state.contentInput,
        author: this.state.authorInput,
        time: new Date(),
        reply: this.state.reply,
      }),
    })
    .then(() => {
      window.location.href = `http://localhost:3000/article/${this.state.articleId}`;
    })
    .catch(err => console.error(err));
  }
  render() {
    const { articleId } = this.props.match.params;
    return (
      <div>
        <h3>this is EditPage</h3>
        <textarea
          placeholder="title..."
          value={this.state.titleInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ titleInput: e.target.value })}
        />
        <textarea
          id="editor"
        />
        {/* <CKEditor
          value={this.state.contentInput}
          match={this.props.match}
          editorInput={e => this.setInputDirty(e)}
          editorChange={e => this.setState({ contentInput: e })}
        /> */}
        <textarea
          placeholder="author..."
          value={this.state.authorInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ authorInput: e.target.value })}
        />
        <nav>
          <Link to={`/article/${articleId}`}>
            <button>
              Cancel
            </button>
          </Link>
          <button onClick={() => this.saveArticle()}>
            Save
          </button>
          <Prompt
            when={this.state.inputDirty}
            message="leaving?"
          />
        </nav>
      </div>
    );
  }
}

export default EditPage;
