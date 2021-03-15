const ImagePopup = ({ card, onClose, onClickOnOverlay }) => {
  return (
      <div className={`popup popup_full-size-image${card ? ' popup_opened' : ''}`} onClick={onClickOnOverlay}>
        <div className="popup__image-container">
          <img className="popup__image" src={card && card.src} alt={card && card.alt} />
          <h2 className="popup__image-title">{card && card.alt}</h2>
          <button
            className="popup__button-close popup__button-close_full-size-image" onClick={onClose}
            type="button">
          </button>
        </div>
      </div>
  );
};

export default ImagePopup;
