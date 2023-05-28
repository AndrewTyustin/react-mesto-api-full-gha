const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');

const { SUCCESS_CREATED } = require('../utils/response-status');

const NotFound = require('../utils/response-errors/NotFound');
const BadRequests = require('../utils/response-errors/BadRequest');
const Forbidden = require('../utils/response-errors/Forbidden');

const getCardList = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardObject) => res.status(SUCCESS_CREATED).send(cardObject))
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-ValidationError
      if (error instanceof ValidationError) {
        next(
          new BadRequests('Переданы некорректные данные при создании карточки'),
        );
      } else {
        next(error);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((selectedCard) => {
      if (!selectedCard) {
        return next(new NotFound('Карточка по указанному _id не найдена'));
      }
      if (!selectedCard.owner.equals(req.user._id)) {
        return next(
          new Forbidden('Вы не являетесь автором карточки, удаление невозможно'),
        );
      }
      return Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => new NotFound('Карточка по указанному _id не найдена'))
        .then(() => {
          res.send({ message: 'Карточка успешно удалена с сервера' });
        });
    })
    .catch((error) => {
      // https://mongoosejs.com/docs/api/error.html#error_Error-CastError
      if (error instanceof CastError) {
        next(new BadRequests('Переданы некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};

const changeLikeCardStatus = (req, res, next, likeOtpions) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Такой карточки нет');
      }
      return Card.findByIdAndUpdate(cardId, likeOtpions, { new: true })
        .then((cardForLike) => cardForLike.populate(['owner', 'likes']))
        .then((cardForLike) => {
          res.send(cardForLike);
        });
    })
    .catch((err) => {
      if (err instanceof CastError) {
        next(new BadRequests('Некорректный Id карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const likeOptions = { $addToSet: { likes: userId } };
  changeLikeCardStatus(req, res, next, likeOptions);
};

const removeLikeCard = (req, res, next) => {
  const { _id: userId } = req.user;
  const likeOptions = { $pull: { likes: userId } };
  changeLikeCardStatus(req, res, next, likeOptions);
};

module.exports = {
  getCardList,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
};
