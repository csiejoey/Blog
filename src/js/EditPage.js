import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './../css/Edit.css';

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
      uiColor: '#FFFFFF'
    });
    const pathname = window.location.pathname;
    const articleId = pathname.slice(14);
    console.log(articleId);
    // const { articleId } = this.props.match.params;
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
    if (!this.state.inputDirty) {
      alert('title can\'t be blank');
      return;
    }
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
        // time: new Date(),
        reply: this.state.reply,
      }),
    })
    .then(() => {
      window.location.href = `https://joeyyee-blog.herokuapp.com/article/${this.state.articleId}`;
    })
    .catch(err => console.error(err));
  }
  render() {
    const pathname = window.location.pathname;
    const articleId = pathname.slice(14);
    console.log(articleId);
    // const { articleId } = this.props.match.params;
    return (
      <div>
        <TextField
          className="textField"
          floatingLabelText="ｔｉｔｌｅ..."
          value={this.state.titleInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ titleInput: e.target.value })}
        />
        <br />
        <textarea
          id="editor"
        />
        {/* <CKEditor
          value={this.state.contentInput}
          match={this.props.match}
          editorInput={e => this.setInputDirty(e)}
          editorChange={e => this.setState({ contentInput: e })}
        /> */}
        <div className="btn">
          <Link to={`/article/${articleId}`}>
            <RaisedButton
              className="cancelBtn"
              label="ｃａｎｃｅｌ"
            />
          </Link>
          <RaisedButton
            label="ｓａｖｅ"
            onClick={() => this.saveArticle()}
          />
          <Prompt
            when={this.state.inputDirty}
            message="ｌｅａｖｉｎｇ？"
          />
        </div>
      </div>
    );
  }
}

export default EditPage;
