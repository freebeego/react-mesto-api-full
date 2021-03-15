import "../index.css";

import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import api from "../utils/api";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isDeleteConfirmPopupOpen, setIsDeleteConfirmPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(undefined);
  const [selectedCardForDelete, setSelectedCardForDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [submitButtonStateOfSending, setSubmitButtonStateOfSending] = React.useState(false);
  const [submitButtonErrorIndication, setSubmitButtonErrorIndication] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    dataInitialisation()
      .then(() => {
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        //console.log(err);
      });
  }, [history]);

  const dataInitialisation = () => {
    return api.getMyInfo()
      .then(data => {
        setCurrentUser({ ...data });
        return api.getCards();
      })
      .then(cards => setCards(cards.reverse()))
  };

  const buttonErrorIndication = () => {
    setSubmitButtonStateOfSending(false);
    setSubmitButtonErrorIndication(true);
    setTimeout(() => setSubmitButtonErrorIndication(false), 600);
  }

  const handleCardClick = (e) => {
    setSelectedCard(e.target);

    document.addEventListener('keyup', handleEscClose);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleConfirmCardDelete(e) {
    e.preventDefault();

    setSubmitButtonStateOfSending(true);
    api.deleteCard(selectedCardForDelete._id)
      .then(() => {
        setSubmitButtonStateOfSending(false);
        const newCards = cards.filter(c => c._id !== selectedCardForDelete._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch(err => {
        buttonErrorIndication();
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsDeleteConfirmPopupOpen(!isDeleteConfirmPopupOpen);
    setSelectedCardForDelete(card);

    document.addEventListener('keyup', handleEscClose);
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(undefined);

    setSelectedCardForDelete({});

    document.removeEventListener('keyup', handleEscClose);
  }

  const handleEscClose = e => {
    if (e.key === 'Escape') closeAllPopups();
  };

  const handleClickOnOverlay = e => {
    if (e.target === e.currentTarget) closeAllPopups();
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    document.addEventListener('keyup', handleEscClose);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    document.addEventListener('keyup', handleEscClose);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    document.addEventListener('keyup', handleEscClose);
  };

  const openInfoTooltip = () => {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
    document.addEventListener('keyup', handleEscClose);
  };

  function handleUpdateUser(fieldsData) {
    setSubmitButtonStateOfSending(true);
    api.editProfile(fieldsData.name, fieldsData.about)
      .then(() => {
        setSubmitButtonStateOfSending(false);
        setCurrentUser({...currentUser, ...fieldsData});
        closeAllPopups();
      })
      .catch(err => {
        buttonErrorIndication();
        console.log(err)
      });
  }

  function handleUpdateAvatar(avatarUrl) {
    setSubmitButtonStateOfSending(true);

    let result;

    api.updateAvatar(avatarUrl)
      .then(() => {
        setSubmitButtonStateOfSending(false);
        setCurrentUser({...currentUser, avatar: avatarUrl});
        closeAllPopups();
        result = true;
      })
      .catch(err => {
        buttonErrorIndication();
        console.log(err);
        result = false;
      });

    return result;
  }

  function handleAddCard(name, pictureUrl) {
    setSubmitButtonStateOfSending(true);

    let result;

    api.addCard(name, pictureUrl)
      .then(card => {
        setSubmitButtonStateOfSending(false);
        setCards([card, ...cards]);
        closeAllPopups();
        result = true;
      })
      .catch(err => {
        buttonErrorIndication();
        console.log(err);
        result = false;
      });

    return result;
  }

  const handleRegister = (email, password) => {
    api.signUp(email, password)
      .then(() => {
        setLoggedIn(true);
        openInfoTooltip();
        handleLogIn(email, password);
      })
      .catch((err) => {
        openInfoTooltip();
        console.log(err);
      });
  }

  function handleLogIn (email, password) {
    api.signIn(email, password)
      .then(() => dataInitialisation())
      .then(() => {
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => {
        openInfoTooltip();
        console.log(err);
      });
  }

  const handleLogOut = () => {
    api.signOut()
      .then(() => {
        setLoggedIn(false);
        setCurrentUser({});
        setCards([]);
        history.push('/sign-in');
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <Header loggedIn={loggedIn} onLogOut={handleLogOut} />

      <Switch>
        {!loggedIn &&
          <Route path="/sign-up">
            <Register
              onRegister={handleRegister}
              submitButtonStateOfSending={submitButtonStateOfSending}
              submitButtonErrorIndication={submitButtonErrorIndication}
            />
          </Route>
        }

        {!loggedIn &&
          <Route path="/sign-in">
            <Login
              onLogIn={handleLogIn}
              submitButtonStateOfSending={submitButtonStateOfSending}
              submitButtonErrorIndication={submitButtonErrorIndication}
            />
          </Route>
        }

        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={loggedIn}

          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          setCurrentUser={setCurrentUser}
          setCards={setCards}
        />

        <Route path="/">
          <Redirect to="/" />
        </Route>
      </Switch>

      {loggedIn && <Footer/>}

      {loggedIn && <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onClickOnOverlay={handleClickOnOverlay}
        submitButtonStateOfSending={submitButtonStateOfSending}
        submitButtonErrorIndication={submitButtonErrorIndication}
      />}

      {loggedIn && <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddCard}
        onClickOnOverlay={handleClickOnOverlay}
        submitButtonStateOfSending={submitButtonStateOfSending}
        submitButtonErrorIndication={submitButtonErrorIndication}
      />}

      {loggedIn && <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onClickOnOverlay={handleClickOnOverlay}
        submitButtonStateOfSending={submitButtonStateOfSending}
        submitButtonErrorIndication={submitButtonErrorIndication}
      />}

      {loggedIn && <PopupWithForm
        isOpen={isDeleteConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleConfirmCardDelete}
        submitButtonText="Да"
        title="Вы уверены?"
        name="delete-card"
        onClickOnOverlay={handleClickOnOverlay}
        submitButtonStateOfSending={submitButtonStateOfSending}
        submitButtonErrorIndication={submitButtonErrorIndication}
        isSubmitButtonActive={true}
      />}

      {loggedIn && <ImagePopup card={selectedCard} onClose={closeAllPopups} onClickOnOverlay={handleClickOnOverlay} />}

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        isSuccess={loggedIn}
        onClose={closeAllPopups}
        onClickOnOverlay={handleClickOnOverlay}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
