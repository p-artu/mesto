export default class Card {
  constructor(data) {
    this._handleCardImageClick = data.callbackData.handleCardImageClick;
    this._handleCardTrashClick = data.callbackData.handleCardTrashClick;
    this._handleCardLikeClick = data.callbackData.handleCardLikeClick;
    this._title = data.infoData.name;
    this._link = data.infoData.link;
    this._likes = data.infoData.likes;
    this._likesQuantity = this._likes.length;
    this._cardOwnerId = data.infoData.owner._id;
    this._myId = data.infoData.myId;
    this._cardId = data.infoData._id;
    this._cardTemplate = data.templateSelector;
    this._getAltByLink = data.getAltByLink;
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
    this._likesElement = this._element.querySelector('.cards-grid__like-sum');
    this._hasMyLike();
    this._likesElement.textContent = this._likesQuantity;
    title.textContent = this._title;
    image.src = this._link;
    image.alt = this._getAltByLink(this._title, this._link);
    if (this._cardOwnerId !== this._myId) {
      this._element.querySelector('.cards-grid__trash').classList.add('cards-grid__trash_hidden');
    }
    return this._element
  }
  addLike() {
    this._likesQuantity++;
    this._likesElement.textContent = this._likesQuantity;
  }
  cancelLike() {
    this._likesQuantity--;
    this._likesElement.textContent = this._likesQuantity;
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
