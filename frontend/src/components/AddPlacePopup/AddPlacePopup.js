import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import Input from "../Input/Input";


const AddPlacePopup = ({
                         isOpen,
                         onClose,
                         onAddCard,
                         onClickOnOverlay,
                         submitButtonStateOfSending,
                         submitButtonErrorIndication
}) => {
  const popupName='add-new-place';

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [fieldNameError, setFieldNameError] = React.useState(false);
  const [fieldLinkError, setFieldLinkError] = React.useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  React.useEffect(() => {
    if (fieldNameError || fieldLinkError || name === ''|| link === '')
      setIsSubmitButtonActive(false);
    else setIsSubmitButtonActive(true);
  }, [fieldLinkError, fieldNameError, name, link]);

  React.useEffect(() => {
    if (isOpen) {
      setLink('');
      setName('');
      setFieldNameError(false);
      setFieldLinkError(false);
    }
  }, [isOpen]);

  const handleChangeName = e => {
    setName(e.target.value);
    setFieldNameError(!e.target.validity.valid);
  };

  const handleChangeLink = e => {
    setLink(e.target.value);
    setFieldLinkError(!e.target.validity.valid);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (onAddCard(name, link)) {
      setName('');
      setLink('');
      e.target.value = '';
    }
  }

  return (
    <PopupWithForm
      title="Новое место"
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
        name="name"
        type="text"
        placeholder="Название"
        maxLength={30}
        value={name}
        onChange={handleChangeName}
        isRequired={true}
        validError={fieldNameError}
        pattern="^.{2,30}$"
        errorMessage="Имя должно состоять как минимум из двух символов."
      />

      <Input
        parent={popupName}
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleChangeLink}
        isRequired={true}
        validError={fieldLinkError}
        pattern="^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?[?=#a-zA-Z0-9&_.]*$"
        errorMessage="Введите корректный URL изображения."
      />

    </PopupWithForm>
  );
};

export default AddPlacePopup;
