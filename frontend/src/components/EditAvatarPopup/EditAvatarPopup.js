import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";


const EditAvatarPopup = ({
                           isOpen,
                           onClose,
                           onUpdateAvatar,
                           onClickOnOverlay,
                           submitButtonStateOfSending,
                           submitButtonErrorIndication
}) => {
  const popupName='update-avatar';

  const [link, setLink] = React.useState('');
  const [fieldLinkError, setFieldLinkError] = React.useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(() => {
    if (fieldLinkError || link === '')
      setIsSubmitButtonActive(false);
    else setIsSubmitButtonActive(true);
  }, [fieldLinkError, link]);

  React.useEffect(() => {
    if (isOpen) setLink('');
    setFieldLinkError(false);
  }, [isOpen]);

  const handleChangeLink = e => {
    setLink(e.target.value);
    setFieldLinkError(!e.target.validity.valid);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (onUpdateAvatar(link)) {
      setLink('');
      setFieldLinkError(false);
    }
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name={popupName}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitButtonText="Сохранить"
      onClickOnOverlay={onClickOnOverlay}
      submitButtonStateOfSending={submitButtonStateOfSending}
      submitButtonErrorIndication={submitButtonErrorIndication}
      isSubmitButtonActive={isSubmitButtonActive}
    >

      <Input
        parent={popupName}
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        isRequired={true}
        onChange={handleChangeLink}
        value={link}
        validError={fieldLinkError}
        pattern="^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?[?=#a-zA-Z0-9&_.]*$"
        errorMessage="Введите корректный URL изображения."
      />

    </PopupWithForm>
  );
};

export default EditAvatarPopup;
