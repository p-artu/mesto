import Card from './Card.js';
import FormValidator from './FormValidator.js';
const initialCards = [
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
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const popups = document.querySelectorAll('.popup');
const profileEditOpenButton = document.querySelector('.profile__edit');
const cardAddOpenButton = document.querySelector('.profile__add');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_issue_profile');
const nameInput = popupProfile.querySelector('.popup__input_theme_name');
const jobInput = popupProfile.querySelector('.popup__input_theme_job');
const formProfile = popupProfile.querySelector('.popup__form');
const popupCards = document.querySelector('.popup_issue_cards');
const formCards = popupCards.querySelector('.popup__form');
const titleInput = popupCards.querySelector('.popup__input_theme_title');
const linkInput = popupCards.querySelector('.popup__input_theme_link');
const cards = document.querySelector('.cards');
const cardsContainer = cards.querySelector('.cards-grid');

function setListener() {
  document.addEventListener('keydown', closePopupEscape);
}
function deleteListener() {
  document.removeEventListener('keydown', closePopupEscape);
}
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  setListener();
}
function closePopup(popup) {
  deleteListener();
  popup.classList.remove('popup_opened');
}
function openPropfilePopup() {
  const popup = new FormValidator(settings, popupProfile);
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popup.enableValidation();
  openPopup(popupProfile);
}
function openCardsPopup() {
  const popup = new FormValidator(settings, popupCards);
  formCards.reset();
  popup.enableValidation();
  openPopup(popupCards);
}
function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
function handleProfileFormSubmit() {
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}
function handleCardFormSubmit() {
  const card = new Card(
    {
      name: titleInput.value,
      link: linkInput.value
    },
    '#card');
  cardsContainer.prepend(card.createCard());
  formCards.reset();
  closePopup(popupCards);
}

initialCards.forEach(item => {
const card = new Card(item, '#card');
  cardsContainer.append(card.createCard());
});
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__exit')) {
      closePopup(popup);
    }
  });
});

profileEditOpenButton.addEventListener('click', openPropfilePopup);
cardAddOpenButton.addEventListener('click', openCardsPopup);
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);
