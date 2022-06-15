import debugModule from 'debug';
const debug = debugModule('router');
const error = debugModule('error');

export function handleSuccess(res, data) {
  if (data === undefined || typeof data !== 'object' || data === null) data = {};
  res.status(200).json(data);
}

export function handleFailure(res, data) {
  if (data.code) return res.status(data.code).json({});
  if (data.warn) return res.status(200).json({ warn: data.warn });
  error(data.err);
  return res.status(500).json({});
}
