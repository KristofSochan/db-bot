import debugModule from 'debug';
const debug = debugModule('app');
const error = debugModule('error');

import './services/router/index.js'
import './services/bot/index.js';
import './services/db/index.js';