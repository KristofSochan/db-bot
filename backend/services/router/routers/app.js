import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

import { handleSuccess, handleFailure } from '../handlers.js';

import sql from '../../db/index.js';

async function define(app) {
  app.post('/api', async (req, res) => {
    try {
      debug('received data', req.body);
      handleSuccess(res, {});
    } catch (err) {
      handleFailure(res, { err });
    }
  });

  app.post('/api/db/query', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return handleFailure(res, { warn: 'missing query' });
      }

      debug('executing query', query);
      const dbRes = sql`${query}`;
      debug('executed query');

      handleSuccess(res, dbRes);
    } catch (err) {
      handleFailure(res, { err });
    }
  });
}

export default {
  define
};
