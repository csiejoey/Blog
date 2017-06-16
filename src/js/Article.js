import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import 'babel-polyfill';
import fetch from 'isomorphic-fetch';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import Reply from './Reply';
import ReplyInput from './ReplyInput';
import './../css/Article.css';

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
    // const getAccessToken = localStorage.getItem('accessToken');
    // console.log(getAccessToken);
    const pathname = window.location.pathname;
    const articleId = pathname.slice(9);
    console.log(articleId);
    // const { articleId } = this.props.match.params;
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
        .then(window.location.href = 'https://joeyyee-blog.herokuapp.com/')
        .catch(err => console.error(err));
    }
    event.preventDefault();
  }
  article() {
    const replaceBreak = this.state.content.replace(/\r?\n/g, '<br />');
    const replaceBlank = replaceBreak.replace(/&nbsp;/g, ' ');
    return (
      <div>
        <div className="title">
          <h2>{this.state.title}</h2>
          <IconMenu
            className="iconMenu"
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>}
          >
            <Link to={`/article/edit/${this.state.articleId}`}>
              <MenuItem primaryText="ｅｄｉｔ" />
            </Link>
            <MenuItem
              primaryText="ｒｅｍｏｖｅ"
              onClick={() => this.removeArticle()}
            />
          </IconMenu>
        </div>
        <hr />
        <div>{ReactHtmlParser(replaceBlank)}</div>
        <h4>{this.state.author} -- {this.state.time}</h4>
        <hr />
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
    const time = new Date();
    const newReply = {
      user: replyUserInput,
      content: replyContentInput,
      time,
    };
    const r = reply.concat(newReply);
    // console.log(r);
    // reply.push(newReply);
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
        reply: r,
      }),
    })
    .then('replyarr', console.log(r))
    // why can't i rerender replyArray?
    // .then(this.setState({
    //   replyUserInput: '',
    //   replyContentInput: '',
    //   reply: reply.concat(newReply),
    // }))
    .then(() => {
      // window.location.href = `http://localhost:3000/article/${articleId}`;
      window.location.href = `https://joeyyee-blog.herokuapp.com/article/${articleId}`;
    })
    .catch(err => console.error(err));
  }
  removeReply(replyId) {
    const rmReply = confirm('ｒｅｍｏｖｅ？');
    const { articleId, title, content, time, author, reply } = this.state;
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
          time,
          reply,
        }),
      })
        .then(this.setState({
          reply,
        }))
        .catch(err => console.error(err));
    }
    event.preventDefault();
  }
  render() {
    const replyArr = this.state.reply.reverse();
    this.state.reply.reverse();
    return (
      <div className="article">
        {this.article()}
        {replyArr.map((x, i) => (
          <Reply
            id={i}
            key={`replyId-${x._id}`}
            replyBody={x}
            removeReply={replyId => this.removeReply(replyId)}
          />),
        )}
        <div className="replyInput">
          <ReplyInput
            user={this.state.replyUserInput}
            content={this.state.replyContentInput}
            editReplyUser={replyUserInput => this.editReplyUser(replyUserInput)}
            editReplyContent={replyContentInput => this.editReplyContent(replyContentInput)}
            postReply={() => this.postReply()}
          />
        </div>
      </div>
    );
  }
}

export default Article;
