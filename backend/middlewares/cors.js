/* eslint-disable linebreak-style */
const accessCors = [
  'https://andrewtyustin.students.nomoredomains.monster',
  'http://andrewtyustin.students.nomoredomains.monster',
  'http://localhost:3000',
  'http://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
function cors(req, res, next) {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  if (accessCors.includes(origin)) {
    res.set({
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    });
  }
  if (method === 'OPTIONS') {
    res.set({
      'Access-Control-Allow-Methods': DEFAULT_ALLOWED_METHODS,
      'Access-Control-Allow-Headers': requestHeaders,
    });
    res.end();
    return;
  }
  next();
}
module.exports = cors;
