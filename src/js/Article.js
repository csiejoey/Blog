import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import Reply from './Reply';
import ReplyInput from './ReplyInput';

class Article extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      author: '',
      time: '',
      reply: [],
      articleId: '',
      replyUserInput: '',
      replyContentInput: '',
    };
  }
  componentDidMount() {
    const { articleId } = this.props.match.params;
    fetch(`/api/get-posts/${articleId}`)
      .then(res => res.json())
      .then((article) => {
        this.setState({
          title: article.title,
          content: article.content,
          author: article.author,
          time: article.time,
          reply: article.reply,
          articleId: article._id,
        });
      })
      .then(() => this.setState({
        replyLen: this.state.reply.length,
      }))
      .catch(err => console.error(err));
  }
  removeArticle() {
    const rmArticle = confirm('remove?');
    if (rmArticle) {
      fetch(`/api/rmpost/${this.state.articleId}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(window.location.href = 'http://localhost:3000/')
        .catch(err => console.error(err));
    }
    event.preventDefault();
  }
  article() {
    const replaceBreak = this.state.content.replace(/\r?\n/g, '<br />');
    const replaceBlank = replaceBreak.replace(/&nbsp;/g, ' ');
    return (
      <div>
        <h2>{this.state.title}</h2>
        <hr />
        <div>{ReactHtmlParser(replaceBlank)}</div>
        <hr />
        <h3>{this.state.author}-{this.state.time}</h3>
      </div>
    );
  }
  controlBtn() {
    return (
      <div>
        <button>
          <Link to={`/article/edit/${this.state.articleId}`}>
          edit
          </Link>
        </button>
        <button onClick={() => this.removeArticle()}>
          remove
        </button>
      </div>
    );
  }
  editReplyUser(replyUserInput) {
    this.setState({
      replyUserInput,
    });
  }
  editReplyContent(replyContentInput) {
    this.setState({
      replyContentInput,
    });
  }
  postReply() {
    const { title, content, author, reply, articleId, replyUserInput, replyContentInput }
      = this.state;
    const newReply = {
      user: replyUserInput,
      content: replyContentInput,
      time: new Date(),
    };
    fetch(`/api/edit/${articleId}`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        author,
        time: new Date(),
        reply: reply.concat(newReply),
      }),
    })
    .then(() => {
      window.location.href = `http://localhost:3000/article/${articleId}`;
    })
    .catch(err => console.error(err));
  }
  removeReply(replyId) {
    const rmReply = confirm('remove?');
    const { articleId, title, content, author, reply } = this.state;
    reply.splice(replyId, 1);
    if (rmReply) {
      fetch(`/api/edit/${articleId}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          author,
          time: new Date(),
          reply,
        }),
      })
        .then(() => {
          window.location.href = `http://localhost:3000/article/${articleId}`;
        })
        .catch(err => console.error(err));
    }
    event.preventDefault();
  }
  render() {
    const replyArr = this.state.reply.reverse();
    this.state.reply.reverse();
    return (
      <div>
        {this.article()}
        {this.controlBtn()}
        {replyArr.map((x, i) => (
          <Reply
            id={i}
            key={`${x._id}`}
            replyBody={x}
            // editReply={}
            removeReply={replyId => this.removeReply(replyId)}
          />),
        )}
        <ReplyInput
          user={this.state.replyUserInput}
          content={this.state.replyContentInput}
          editReplyUser={replyUserInput => this.editReplyUser(replyUserInput)}
          editReplyContent={replyContentInput => this.editReplyContent(replyContentInput)}
          postReply={() => this.postReply()}
        />
      </div>
    );
  }
}

export default Article;
