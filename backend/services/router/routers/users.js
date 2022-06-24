import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

import pool from '../../db/index.js';
import jwt from 'jsonwebtoken';
import utils from '../../utils/index.js';
import { handleSuccess, handleFailure } from '../handlers.js';
import {
  authenticateTokenMiddleware,
  generateAccessToken,
  generateRefreshToken
} from '../tokens.js';

async function define(app) {
  app.get('/users', authenticateTokenMiddleware, async (req, res) => {
    let user;
    try {
      const { rows } = await pool.query('SELECT * FROM auth.users WHERE id = $1', [req.user.id]);
      if (rows.length != 1) return handleFailure(res, { code: 401 });
      user = rows[0];
    } catch (err) {
      return handleFailure(res, { err });
    }
    delete user.password;
    handleSuccess(res, user);
  });

  app.post('/users/signup', async (req, res) => {
    const { email, username, password } = req.body;

    // check if user provided values are valid
    if (!utils.validator.isEmail(email))
      return handleFailure(res, { warn: 'Invalid email address' });
    if (!utils.validator.isUsername(username))
      return handleFailure(res, { warn: 'Username must be atleast 6 alphanumeric characters' });
    if (!utils.validator.isPassword(password))
      return handleFailure(res, { warn: 'Password must be atleast 8 characters' });

    // check if email is in use
    try {
      const { rows } = await pool.query('SELECT * FROM auth.users WHERE email = $1', [email]);
      if (rows.length > 0) return handleFailure(res, { warn: 'Email address in use' });
    } catch (err) {
      return handleFailure(res, { err });
    }

    // check if username is in use
    try {
      const { rows } = await pool.query('SELECT * FROM auth.users WHERE username = $1', [username]);
      if (rows.length > 0) return handleFailure(res, { warn: 'Username address in use' });
    } catch (err) {
      return handleFailure(res, { err });
    }

    // hash password and insert into db
    try {
      const passwordHashed = await utils.password.hash(password);

      await pool.query('INSERT INTO auth.users(email, username, password) VALUES($1, $2, $3)', [email, username, passwordHashed]);
    } catch (err) {
      return handleFailure(res, { err });
    }
    return handleSuccess(res);
  });

  app.post('/users/signin', async (req, res) => {
    const { email, password } = req.body;

    if (email.length === 0) return handleFailure(res, { warn: 'Email cannot be blank' });
    if (password.length === 0) return handleFailure(res, { warn: 'Password cannot be blank' });

    // check if email is in use
    let user;
    try {
      const { rows } = await pool.query('SELECT * FROM auth.users WHERE email = $1', [email]);
      if (rows.length != 1) return handleFailure(res, { warn: 'Email address in use' });
      user = rows[0]
    } catch (err) {
      return handleFailure(res, { err });
    }

    // verify password
    let success = false;
    try {
      success = await utils.password.verify(password, user.password);
    } catch (err) {
      return handleFailure(res, { err });
    }
    if (success !== true) return handleFailure(res, { warn: 'Invalid email or password ' });

    // generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // store refresh token
    try {
      await pool.query('INSERT INTO auth.tokens(id) VALUES($1)', [refreshToken]);
    } catch (err) {
      return handleFailure(res, { err });
    }
    return handleSuccess(res, { accessToken, refreshToken });
  });

  app.post('/users/logout', async (req, res) => {
    const { token } = req.body;

    try {
      await pool.query('DELETE FROM auth.tokens WHERE id = $1', [token]);
    } catch (err) {
      return handleFailure(res, { err });
    }
    return handleSuccess(res);
  });

  app.post('/users/token', async (req, res) => {
    const { token } = req.body;
    if (!token) return handleFailure(res, { warn: 'Missing refresh token' });

    try {
      const { rows } = await pool.query('SELECT * FROM auth.tokens WHERE id = $1', [token]);
      if (rows.length !== 1) return handleFailure(res, { code: 401 });
    } catch (err) {
      return handleFailure(res, { err });
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return handleFailure(res, { code: 401 });
      const accessToken = generateAccessToken(user.id);
      return handleSuccess(res, { accessToken });
    });
  });
}

export default {
  define
};
