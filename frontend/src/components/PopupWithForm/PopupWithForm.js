import Form from "../Form/Form";

const PopupWithForm = ({
                         title,
                         name,
                         children,
                         isOpen,
                         onClose,
                         onSubmit,
                         submitButtonText,
                         onClickOnOverlay,
                         submitButtonStateOfSending,
                         submitButtonErrorIndication,
                         isSubmitButtonActive
}) => {
  const submitButtonClassName = (`form__button-submit form__button-submit_${name}`)
                                + (!isSubmitButtonActive ? ' form__button-submit_disabled' : '')
                                + (submitButtonErrorIndication ? ' form__button-submit_error' : '');

  return (
    <div className={`popup popup_${name}${isOpen ? ' popup_opened' : ''}`} onMouseDown={onClickOnOverlay}>
      <div className={`popup__container popup__container_${name}`}>
        <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
        <Form
          name={name}
          onSubmit={onSubmit}
          submitButtonText={submitButtonText}
          submitButtonClassName={submitButtonClassName}
          isSubmitButtonActive={isSubmitButtonActive}
          submitButtonErrorIndication={submitButtonErrorIndication}
          submitButtonStateOfSending={submitButtonStateOfSending}
        >
          {children && children}
        </Form>
        <button
          className={`popup__button-close popup__button-close_${name}`}
          type="button"
          onClick={onClose}
        >
        </button>
      </div>
    </div>
  );
};

export default PopupWithForm;
