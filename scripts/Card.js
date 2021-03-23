import {openPopup} from './index.js';
import {popupImage} from './constants.js';
import {getAltByLink} from './utils.js';
export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.cards-grid__item')
      .cloneNode(true);

    return cardElement;
  }
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const title = this._element.querySelector('.cards-grid__title');
    const image = this._element.querySelector('.cards-grid__image');
    title.textContent = this._name;
    image.src = this._link;
    image.alt = getAltByLink(this._name, this._link);
    return this._element
  }
  _likeCard(element) {
    element.classList.toggle('cards-grid__icon_active');
  }
  _deleteCard(element) {
    element.remove();
  }
  _openImagePopup(element) {
    popupImage.querySelector('.popup__image').src = element.src;
    popupImage.querySelector('.popup__image').alt = element.alt;
    popupImage.querySelector('.popup__image-caption').textContent = element.closest('.cards-grid__item').querySelector('.cards-grid__title').textContent;
    openPopup(popupImage);
  }
  _clickCard(evt) {
    if (evt.target.classList.contains('cards-grid__icon')) {
      this._likeCard(evt.target);
    } else if (evt.target.classList.contains('cards-grid__trash')) {
      this._deleteCard(evt.target.closest('.cards-grid__item'));
    } else if (evt.target.classList.contains('cards-grid__image')) {
      this._openImagePopup(evt.target);
    }
  }
  _setEventListeners() {
    this._element.addEventListener('click', evt => {
      this._clickCard(evt);
    });
  }
}
