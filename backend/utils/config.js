const {
  PORT = 3000,
  DB = 'mongodb://127.0.0.1:27017/mestodb',
  JWT_SECRET = '983b6dd40f2244d9fd1a0a24ffb02429',
} = process.env;
module.exports = {
  PORT,
  DB,
  JWT_SECRET,
};
