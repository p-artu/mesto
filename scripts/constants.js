export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
export const popups = document.querySelectorAll('.popup');
export const profileEditOpenButton = document.querySelector('.profile__edit');
export const cardAddOpenButton = document.querySelector('.profile__add');
export const title = document.querySelector('.profile__title');
export const subtitle = document.querySelector('.profile__subtitle');
export const popupProfile = document.querySelector('.popup_issue_profile');
export const nameInput = popupProfile.querySelector('.popup__input_theme_name');
export const jobInput = popupProfile.querySelector('.popup__input_theme_job');
export const formProfile = popupProfile.querySelector('.popup__form');
export const popupCards = document.querySelector('.popup_issue_cards');
export const formCards = popupCards.querySelector('.popup__form');
export const titleInput = popupCards.querySelector('.popup__input_theme_title');
export const linkInput = popupCards.querySelector('.popup__input_theme_link');
export const cards = document.querySelector('.cards');
export const cardsContainer = cards.querySelector('.cards-grid');
export const popupImage = document.querySelector('.popup_issue_image');
