import React from "react";
import {CurrentUserContext} from "../../../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <li className="card">
      {isOwn && <button className="card__button-delete" onClick={handleDeleteClick} type="button"></button>}
      <img className="card__img" src={card.link} alt={card.name} onClick={onCardClick} />
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-container">
          <button
            className={'card__button-like' + (isLiked ? ' card__button-like_liked' : '')}
            type="button"
            onClick={handleLikeClick}
          >
          </button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
