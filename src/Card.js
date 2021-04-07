import {getAltByLink} from './utils.js';
export default class Card {
  constructor(data, templateSelector, {handleCardClick}) {
    this._handleCardClick = handleCardClick;
    this._name = data.title;
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
  _clickCard(evt) {
    if (evt.target.classList.contains('cards-grid__icon')) {
      this._likeCard(evt.target);
    } else if (evt.target.classList.contains('cards-grid__trash')) {
      this._deleteCard(evt.target.closest('.cards-grid__item'));
    } else if (evt.target.classList.contains('cards-grid__image')) {
      this._handleCardClick(evt.target);
    }
  }
  _setEventListeners() {
    this._element.addEventListener('click', evt => {
      this._clickCard(evt);
    });
  }
}