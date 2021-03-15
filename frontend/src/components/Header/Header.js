import logo from "../../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Header = ({ loggedIn, onLogOut }) => {
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();

  const [isMenuOpened, setIsMenuOpened] =React.useState(false);

  const onClickMenu = () => setIsMenuOpened(!isMenuOpened);
  const handleLogOut = () => {
    setIsMenuOpened(false);
    onLogOut();
  };

  return (
    <>
      { loggedIn &&
        <nav className={'nav' + (isMenuOpened ? ' nav_opened' : '')}>
          <p className="nav__email">{currentUser.email}</p>
          <button className="nav__log-out" onClick={handleLogOut}>Выйти</button>
        </nav>
      }
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Проекта Место" />

        { loggedIn &&
          <button className="hamburger-menu-button" onClick={onClickMenu}>
            <span className={'hamburger-menu-button__pseudoicon' + (isMenuOpened ? ' hamburger-menu-button__pseudoicon_on' : '')}>
            </span>
          </button>
        }
        { !loggedIn &&
          <Link to={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"} className="header__link link">
            {location.pathname === "/sign-in" ? 'Регистрация' : 'Войти'}
          </Link>
        }
      </header>
    </>
  );
};

export default Header;
