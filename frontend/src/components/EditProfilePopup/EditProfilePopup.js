import React from "react";

import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Input from "../Input/Input";

const EditProfilePopup = ({
                            isOpen,
                            onClose,
                            onUpdateUser,
                            onClickOnOverlay,
                            submitButtonStateOfSending,
                            submitButtonErrorIndication
}) => {
  const popupName = 'edit-profile';

  const [fieldsData, setFieldsData] = React.useState({name: '', about: ''});
  const [fieldsError, setFieldsError] = React.useState({name: false, about: false});
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setFieldsData({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  React.useEffect(() => {
    if (fieldsError.name || fieldsError.about || fieldsData.name === ''|| fieldsData.about === '')
      setIsSubmitButtonActive(false);
    else setIsSubmitButtonActive(true);

    if (fieldsData.name === currentUser.name && fieldsData.about === currentUser.about)
      setIsSubmitButtonActive(false);
  }, [fieldsError, fieldsData, currentUser]);

  function handleChange(e) {
    setFieldsData({
      ...fieldsData,
      [e.target.name]: e.target.value
    });

    setFieldsError({
      ...fieldsError,
      [e.target.name]: !e.target.validity.valid
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser(fieldsData);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
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
        placeholder="Имя"
        maxLength={30}
        value={fieldsData.name || ''}
        onChange={handleChange}
        isRequired={true}
        validError={fieldsError.name}
        pattern="^.{2,30}$"
        errorMessage="Имя должно состоять как минимум из двух символов."
      />

      <Input
        parent={popupName}
        name="about"
        type="text"
        placeholder="О себе"
        maxLength={30}
        value={fieldsData.about || ''}
        onChange={handleChange}
        isRequired={true}
        validError={fieldsError.about}
        pattern="^.{2,30}$"
        errorMessage="Нужно ввести как минимум два символа."
      />

    </PopupWithForm>
  );
};

export default EditProfilePopup;
