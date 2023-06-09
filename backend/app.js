require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
// eslint-disable-next-line import/no-unresolved
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mainRouter = require('./routes/index');

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const responseHandler = require('./middlewares/response-handler');

const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(cors);
app.use(mainRouter);
app.use(errorLogger);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер успешно запущен');
});
