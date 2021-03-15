import success from "../../images/success.svg";
import failure from "../../images/failure.svg";

const InfoTooltip = ({
                       isOpen,
                       isSuccess,
                       onClose,
                       onClickOnOverlay
}) => {
  const message = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <div className={`popup popup_tip ${isOpen ? 'popup_opened' : ''}`} onMouseDown={onClickOnOverlay}>
      <div className={`popup__container popup__container_tip`}>
        <img
          className="popup__icon"
          src={ isSuccess ? success : failure }
          alt={ 'Иконка ' + (isSuccess ? '' : 'без') + 'успешно завершившейся операции.' }
        />
        <p className="popup__message">{message}</p>
        <button
          className={`popup__button-close popup__button-close_tip`}
          type="button"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  );
};

export default InfoTooltip;
