import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

import cors from 'cors';
import compression from 'compression';
import path from 'path';
import express from 'express';
const app = express();

import routerApp from './routers/app.js';
import routerUsers from './routers/users.js';

debug('initializing router');
app.use(express.json());
app.use(compression());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);

await routerApp.define(app);
await routerUsers.define(app);

app.use(express.static(path.resolve('./../frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve('./../frontend/dist/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
  debug('listening on port', port);
});
