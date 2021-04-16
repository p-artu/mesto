export const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};
export const profileEditOpenButton = document.querySelector('.profile__edit');
export const cardAddOpenButton = document.querySelector('.profile__add');
export const avatarEditOpenButton = document.querySelector('.profile__avatar-edit');
export const popupProfile = document.querySelector('.popup_issue_profile');
export const nameInput = popupProfile.querySelector('.popup__input_theme_name');
export const jobInput = popupProfile.querySelector('.popup__input_theme_job');
export const formProfile = popupProfile.querySelector('.popup__form');
export const buttonProfile = formProfile.querySelector('.popup__submit');
export const popupCards = document.querySelector('.popup_issue_cards');
export const formCards = popupCards.querySelector('.popup__form');
export const buttonCards = formCards.querySelector('.popup__submit');
export const titleInput = popupCards.querySelector('.popup__input_theme_title');
export const linkInput = popupCards.querySelector('.popup__input_theme_link');
export const cards = document.querySelector('.cards');
export const popupAvatar = document.querySelector('.popup_issue_avatar');
export const formAvatar = popupAvatar.querySelector('.popup__form');
export const buttonAvatar = formAvatar.querySelector('.popup__submit');
export const popupDelete = document.querySelector('.popup_issue_delete');
export const formDelete = popupDelete.querySelector('.popup__form');
