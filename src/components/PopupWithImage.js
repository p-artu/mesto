import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, getAltByLink) {
    super(popupSelector);
    this._getAltByLink = getAltByLink;
    this._image = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__image-caption');
  }
  open(title, link) {
    this._image.src = link;
    this._image.alt = this._getAltByLink(title, link);
    this._imageCaption.textContent = title;
    super.open();
  }
}
