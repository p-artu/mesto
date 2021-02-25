function showInputError(form, input, errorMessage, settings) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(settings.errorClass);
}
function hideInputError(form, input, settings) {
  const error = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  error.classList.remove(settings.errorClass);
  error.textContent = '';
}
function isValid(form, input, settings) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
}
function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid
  })
}
function toggleButtonState(inputList, button, settings) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
}
function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const button = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, button, settings);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, settings);
      toggleButtonState(inputList, button, settings)
    });
  });
}
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(form, settings);
  });
}
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
