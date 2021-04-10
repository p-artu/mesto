import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._popupForm = this._popup.querySelector('.popup__form');
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }
  close() {
    this._popupForm.reset();
    super.close();
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
