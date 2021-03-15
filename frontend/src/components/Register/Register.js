import Form from "../Form/Form";
import Input from "../Input/Input";
import React from "react";
import { Link } from "react-router-dom";

const Register = ({
                    onRegister,
                    submitButtonStateOfSending,
                    submitButtonErrorIndication
                  }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [fieldEmailError, setFieldEmailError] = React.useState(false);
  const [isSubmitButtonActive, setIsSubmitButtonActive] = React.useState(false);

  const submitButtonClassName = ('form__button-submit form__button-submit_ident')
    + (!isSubmitButtonActive ? ' form__button-submit_disabled' : '')
    + (submitButtonErrorIndication ? ' form__button-submit_error' : '');

  React.useEffect(() => {
    if (fieldEmailError || email === ''|| password === '')
      setIsSubmitButtonActive(false);
    else setIsSubmitButtonActive(true);
  }, [fieldEmailError, email, password]);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
    setFieldEmailError(!e.target.validity.valid);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <section className="ident">
      <h1 className="ident__title">Регистрация</h1>
      <Form
        name='login'
        submitButtonText={'Зарегистрироваться'}
        onSubmit={handleSubmit}
        submitButtonClassName={submitButtonClassName}
        isSubmitButtonActive={isSubmitButtonActive}
        submitButtonErrorIndication={submitButtonErrorIndication}
        submitButtonStateOfSending={submitButtonStateOfSending}
      >
        <Input
          parent="ident"
          name="email"
          type="email"
          placeholder="Email"
          isRequired={true}
          onChange={handleChangeEmail}
          value={email}
          validError={fieldEmailError}
          maxLength={50}
          errorMessage="Некорректный email."
        />
        <Input
          parent="ident"
          name="password"
          type="password"
          placeholder="Пароль"
          maxLength={30}
          value={password}
          onChange={handleChangePassword}
          isRequired={true}
          errorMessage="Некорректный пароль."
        />
      </Form>

      <p className="ident__bottom_question">
        Уже зарегистрированы?<Link to="/sign-in" href="" className="ident__link link"> Войти</Link>
      </p>
    </section>
  );
};

export default Register;
