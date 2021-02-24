function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add('popup__input_type_error');
  error.textContent = errorMessage;
  error.classList.add('popup__error_visible');
}
function hideInputError(form, input) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove('popup__input_type_error');
  error.classList.remove('popup__error_visible');
  error.textContent = '';
}
function isValid(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}
function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__submit_disabled');
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove('popup__submit_disabled');
    button.removeAttribute('disabled');
  }
}
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const button = form.querySelector('.popup__submit');
  toggleButtonState(inputList, button);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputList, button)
    });
  });
}
function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(form);
  });
}
enableValidation();
