import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {
  initialCards,
  settings,
  popups,
  profileEditOpenButton,
  cardAddOpenButton,
  title,
  subtitle,
  popupProfile,
  nameInput,
  jobInput,
  formProfile,
  popupCards,
  formCards,
  titleInput,
  linkInput,
  cardsContainer
} from './constants.js';
const popupProfileClass = new FormValidator(settings, popupProfile);
const popupCardsClass = new FormValidator(settings, popupCards);

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
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  popupProfileClass.enableValidation();
  openPopup(popupProfile);
}
function openCardsPopup() {
  formCards.reset();
  popupCardsClass.enableValidation();
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
