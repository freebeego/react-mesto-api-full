import React from "react";

import Card from "./Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Main = ({
                onEditProfile,
                onAddPlace,
                onEditAvatar,
                onCardClick,
                cards,
                onCardLike,
                onCardDelete,
              }) => {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__cover" onClick={onEditAvatar}>
          <img className="profile__photo" src={currentUser.avatar} alt="Аватар пользователя" />
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__button-edit" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
