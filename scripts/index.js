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
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_theme_name');
const jobInput = popupProfile.querySelector('.popup__input_theme_job');
const popupCards = document.querySelector('.popup_issue_cards');
const formCards = popupCards.querySelector('.popup__form');
const titleInput = popupCards.querySelector('.popup__input_theme_title');
const linkInput = popupCards.querySelector('.popup__input_theme_link');
const cards = document.querySelector('.cards');
const cardsContainer = cards.querySelector('.cards-grid');
const popupImage = document.querySelector('.popup_issue_image');
const cardTemplate = document.querySelector('#card').content;

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  const image = cardElement.querySelector('.cards-grid__image');
  image.src = card.link;
  switch (card.link) {
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg':
      image.alt = `Вершины ${card.name}а`;
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg':
      image.alt = `Река в Челябинской области`;
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg':
      image.alt = `Многоэтажки в ${card.name}`;
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg':
      image.alt = `Гора на Камчатке`;
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg':
      image.alt = `Железная дорога в Холмогорском районе`;
        break;
    case 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg':
      image.alt = `Зимний, скалистый берег на озере ${card.name}`;
        break;
    default:
      image.alt = `Ваша картинка ${card.name}`;
  }
  cardElement.querySelector('.cards-grid__title').textContent = card.name;
  return cardElement
}
function setListener() {
  document.addEventListener('keydown', closePopupEscape);
}
function deleteListener() {
  document.removeEventListener('keydown', closePopupEscape);
}
function openPopup(popup) {
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
  const inputList = Array.from(formProfile.querySelectorAll(settings.inputSelector));
  const button = formProfile.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, button, settings);
  isValid(popupProfile, nameInput, settings);
  isValid(popupProfile, jobInput, settings);
  openPopup(popupProfile);
}
function openCardsPopup() {
  formCards.reset();
  const inputList = Array.from(formCards.querySelectorAll(settings.inputSelector));
  const button = formCards.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, button, settings);
  hideInputError(formCards, titleInput, settings);
  hideInputError(formCards, linkInput, settings);
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
  cardsContainer.prepend(createCard({
    name: titleInput.value,
    link: linkInput.value
  }));
  formCards.reset();
  closePopup(popupCards);
}
function  likeCard(element) {
  element.classList.toggle('cards-grid__icon_active');
}
function deleteCard(element) {
  element.remove();
}
function openImagePopup(element) {
  popupImage.querySelector('.popup__image').src = element.src;
  popupImage.querySelector('.popup__image').alt = element.alt;
  popupImage.querySelector('.popup__image-caption').textContent = element.closest('.cards-grid__item').querySelector('.cards-grid__title').textContent;
  openPopup(popupImage);
}
function  clickCard(evt) {
  if (evt.target.classList.contains('cards-grid__icon')) {
    likeCard(evt.target);
  } else if (evt.target.classList.contains('cards-grid__trash')) {
    deleteCard(evt.target.closest('.cards-grid__item'));
  } else if (evt.target.classList.contains('cards-grid__image')) {
    openImagePopup(evt.target);
  }
}
initialCards.forEach(function(item) {
  cardsContainer.append(createCard(item));
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
cards.addEventListener('click', clickCard);


