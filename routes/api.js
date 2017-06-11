import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const router = express.Router();
// const url = 'mongodb://localhost:27017/test';

const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog');
}

const postSchema = new Schema({
  title: { type: String, required: true },
  content: String,
  author: String,
  time: { type: String, required: true },
  reply: [{
    content: { type: String, required: true },
    user: String,
    time: { type: String, required: true },
  }],
}, { collection: 'posts' });

const PostData = mongoose.model('posts', postSchema);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/get-posts', (req, res) => {
  PostData.find({})
    .then(posts => res.send(posts))
    .catch(err => console.error(err));
});

router.get('/get-posts/:id', (req, res) => {
  const postId = req.params.id;
  PostData.findOne({ _id: postId })
    .then(post => res.send(post))
    .catch(err => console.error(err));
});

router.post('/post', (req) => {
  console.log('POST/req.body: ', req.body);
  const postObj = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    time: req.body.time,
    reply: req.body.reply,
  };
  const newPost = new PostData(postObj);
  newPost.save();
  // res.redirect('/');
});
router.post('/edit', (req, res) => {
  console.log('EDIT/req.body: ', req.body);
  const editObj = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    time: req.body.time,
    reply: req.body.reply,
  };
  const PostId = req.body.articleId;
  // const newPost = req.body;
  PostData.findByIdAndUpdate(PostId, editObj)
    .then(post => res.send(post))
    .catch(err => console.error(err));
});

router.post('/rmpost/:PostId', (req, res) => {
  const PostId = req.params.PostId;
  PostData.findByIdAndRemove(PostId)
    .then(post => res.status(204).send(post))
    .catch(err => console.error(err));
});

router.post('/reply', (req, res) => {

});

router.post('/rmreply', (req, res) => {

});

module.exports = router;
