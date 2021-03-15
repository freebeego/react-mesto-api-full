const Card = require('../models/card');

const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => card.populate('owner').execPopulate())
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(new NotFoundError('Карточка с указанным id не существует.'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удалять можно только свои карточки.');
      }
      return Card.findByIdAndRemove(id).populate(['owner', 'likes']);
    })
    .then((deletedCard) => res.status(200).send(deletedCard))
    .catch(next);
};

const addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным id не существует.'))
    .then((card) => card.populate(['owner', 'likes']).execPopulate())
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка с указанным id не существует.'))
    .then((card) => card.populate(['owner', 'likes']).execPopulate())
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
};
