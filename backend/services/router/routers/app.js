import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

import { handleSuccess, handleFailure } from '../handlers.js';

async function define(app) {
  app.post('/api', async (req, res) => {
    try {
      debug('received data', req.body);
      handleSuccess(res, {});
    } catch (err) {
      handleFailure(res, { err });
    }
  });

  // app.use('/api/signin', (req, res) => {
  //   res.send({
  //     token: 'test123'
  //   });
  // });
}

export default {
  define
};
