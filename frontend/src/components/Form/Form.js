const Form = ({
                children,
                name,
                onSubmit,
                submitButtonText,
                submitButtonClassName,
                isSubmitButtonActive,
                submitButtonErrorIndication,
                submitButtonStateOfSending
}) => {
  return (
    <form className="form" name={name} onSubmit={onSubmit} noValidate>
      {children && children}
      <button className={submitButtonClassName} type="submit" disabled={!isSubmitButtonActive}>
        {submitButtonErrorIndication ? 'Ошибка!' :
          submitButtonStateOfSending ? 'Сохранение...' :
            submitButtonText}
      </button>
    </form>
  );
}

export default Form;
