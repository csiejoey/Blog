import express from 'express';
import webpack from 'webpack';
import path from 'path';
import bodyParser from 'body-parser';
import config from './webpack.config';

const server = express();
const compiler = webpack(config);
const port = process.env.PORT || 3000;
const api = require('./routes/api');

server.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
}));

server.use('/static', express.static('public'));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));

server.use('/api', api);

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(port, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`listening on port: ${port}`);
});

module.exports = server;
