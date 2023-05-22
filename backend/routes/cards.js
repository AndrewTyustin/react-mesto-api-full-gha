const cardRouter = require('express').Router();

const {
  getCardList,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/cards');

const {
  validateCreateCard,
  validateCardId,
} = require('../utils/data-validation');

cardRouter.get('/', getCardList);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, removeLikeCard);

module.exports = cardRouter;
