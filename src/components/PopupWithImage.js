import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(element) {
    const popupImage = document.querySelector('.popup_issue_image');
    popupImage.querySelector('.popup__image').src = element.src;
    popupImage.querySelector('.popup__image').alt = element.alt;
    popupImage.querySelector('.popup__image-caption').textContent = element.closest('.cards-grid__item').querySelector('.cards-grid__title').textContent;
    super.open();
  }
}
