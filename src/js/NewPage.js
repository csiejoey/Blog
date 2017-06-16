import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './../css/Edit.css';

class NewPage extends Component {
  constructor() {
    super();
    this.state = {
      titleInput: '',
      contentInput: '',
      inputDirty: false,
    };
  }
  componentDidMount() {
    // const getAccessToken = localStorage.getItem('accessToken');
    // console.log(getAccessToken);
    CKEDITOR.replace('editor', {
      uiColor: '#FFFFFF'
    });
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
  }
  setInputDirty(e) {
    const isDirty = !!e.target.value.trim();
    this.setState({ inputDirty: isDirty });
  }
  fetchArticleIdAndRedirect() {
    fetch('/api/get-posts')
      .then(res => res.json())
      .then((fetchedPosts) => {
        const newestId = fetchedPosts.reverse()[0]._id;
        window.location.href = `https://joeyyee-blog.herokuapp.com/article/${newestId}`;
      })
      .catch(err => console.error(err));
  }
  postArticle() {
    if (!this.state.inputDirty) {
      alert('title can\'t be blank');
      return;
    }
    fetch('/api/post', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: this.state.titleInput,
        content: this.state.contentInput,
        author: this.props.name,
        time: new Date(),
      }),
    })
    .then(this.fetchArticleIdAndRedirect())
    .catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="ｔｉｔｌｅ..."
          className="textField"
          value={this.state.titleInput}
          onInput={e => this.setInputDirty(e)}
          onChange={e => this.setState({ titleInput: e.target.value })}
        />
        <textarea
          id="editor"
        />
        {/* <CKEditor
          defaultValue={this.state.contentInput}
          editorInput={e => this.setInputDirty(e)}
          editorChange={e => this.setState({ contentInput: e })}
        /> */}
        <div className="btn">
          <Link to="/">
            <RaisedButton
              className="cancelBtn"
              label="ｃａｎｃｅｌ"
            />
          </Link>
          <RaisedButton
            label="ｐｏｓｔ"
            onClick={() => this.postArticle()}
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

export default NewPage;
