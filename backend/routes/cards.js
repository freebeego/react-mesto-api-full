const cardsRouter = require('express').Router();

const { createCardValidator, CardValidator } = require('../middlewares/prevalidation/card');

const {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

cardsRouter.get('/', getAllCards);
cardsRouter.post('/', createCardValidator, createCard);
cardsRouter.delete('/:id', CardValidator, deleteCard);
cardsRouter.put('/:id/likes', CardValidator, addLike);
cardsRouter.delete('/:id/likes', CardValidator, removeLike);

module.exports = cardsRouter;
