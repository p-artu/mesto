export default class Card {
  constructor(data, templateSelector, {handleCardImageClick, handleCardTrashClick, handleCardLikeClick}, getAltByLink) {
    this._handleCardImageClick = handleCardImageClick;
    this._handleCardTrashClick = handleCardTrashClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._myId = data.myId;
    this._cardId = data._id;
    this._cardTemplate = templateSelector;
    this._getAltByLink = getAltByLink;
  }
  _hasMyLike() {
    const has = this._likes.some(like => {
      return like._id === this._myId
    });
    if (has) {
      this.likeCard();
    }
  }
  getCardId() {
    return this._cardId
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
    const likes = this._element.querySelector('.cards-grid__like-sum');
    this._hasMyLike();
    likes.textContent = this._likes.length;
    title.textContent = this._title;
    image.src = this._link;
    image.alt = this._getAltByLink(this._title, this._link);
    if (this._cardOwnerId !== this._myId) {
      this._element.querySelector('.cards-grid__trash').classList.add('cards-grid__trash_hidden');
    }
    return this._element
  }
  likeCard() {
    this._element.querySelector('.cards-grid__icon').classList.toggle('cards-grid__icon_active');
  }
  deleteCard() {
    this._element.remove();
  }
  _clickCard(evt) {
    if (evt.target.classList.contains('cards-grid__icon')) {
      this._handleCardLikeClick(evt.target);
    } else if (evt.target.classList.contains('cards-grid__trash')) {
      this._handleCardTrashClick();
    } else if (evt.target.classList.contains('cards-grid__image')) {
      this._handleCardImageClick(this._title, this._link);
    }
  }
  _setEventListeners() {
    this._element.addEventListener('click', evt => {
      this._clickCard(evt);
    });
  }
}
