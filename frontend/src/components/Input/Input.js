const Input = ({
                 parent,
                 type,
                 name,
                 placeholder,
                 maxLength,
                 value,
                 onChange,
                 urlRef,
                 isRequired,
                 validError,
                 errorMessage,
                 pattern
}) => {
  const inputOptions = {};

  inputOptions['className'] = `form__input form__input_${parent}` + (validError ? ' form__input_error' : '');
  inputOptions['name'] = name;
  inputOptions['id'] = `${parent}-input-${name}`;
  inputOptions['type'] = type;
  inputOptions['placeholder'] = placeholder;
  if (maxLength) inputOptions['maxLength'] = maxLength;
  if (value !== undefined) inputOptions['value'] = value;
  if (onChange) inputOptions['onChange'] = onChange;
  if (urlRef) inputOptions['ref'] = urlRef;
  if (pattern) inputOptions['pattern'] = pattern;
  if (isRequired) inputOptions['required'] = true;
  return (
    <>
      <input {...inputOptions} />

      <span
        className={`form__input-error ${validError ? 'form__input-error_active' : ''}`}
        id={`${parent}-input-${name}-error`}
      >
        {errorMessage}
      </span>
    </>
  );
};

export default Input;
