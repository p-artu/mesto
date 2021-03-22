export default class FormValidator {
  constructor(settings, popup) {
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._popup = popup;
  }
  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }
  _hideInputError(input) {
    const error = this._form.querySelector(`#${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }
  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }
  _hasInvalidInput(inputList) {
    return inputList.some((input) => {
      return !input.validity.valid
    })
  }
  _toggleButtonState(inputList, button) {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', true);
    } else {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    }
  }
  _setEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    const button = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, button);
    inputList.forEach(input => {
      if (this._popup.classList.contains('popup_issue_profile')) {
        this._isValid(input);
      }
      if (this._popup.classList.contains('popup_issue_cards')) {
        this._hideInputError(input);
      }
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputList, button)
      });
    });
  }
  enableValidation() {
    this._form = this._popup.querySelector(this._formSelector);
    this._form.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }
}
