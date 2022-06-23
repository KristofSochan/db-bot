import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

import jwt from 'jsonwebtoken';
import { handleSuccess, handleFailure } from './handlers.js';

export function generateAccessToken(id) {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
}

export function generateRefreshToken(id) {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return handleFailure(res, { code: 401 });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return handleFailure(res, { code: 401 });
    req.user = user;
    next();
  });
}

export async function authenticateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
}
