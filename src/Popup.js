export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close(document.querySelector('.popup_opened'));
    }
  }
  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', evt => {
      this._handleEscClose(evt);
    });
  }
  close() {
    document.removeEventListener('keydown', evt => {
      this._handleEscClose(evt);
    });
    this._popup.classList.remove('popup_opened');
  }
  setEventListeners() {
    this._popup.querySelector('.popup__exit').addEventListener('click', () => {
      this.close();
    });
  }
}
