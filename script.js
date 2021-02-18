const edit = document.querySelector('.profile__edit');
const add = document.querySelector('.profile__add');
const title = document.querySelector('.profile__title');
const subtitle = document.querySelector('.profile__subtitle');
const popupProfile = document.querySelector('.popup_issue_profile');
const exitProfile = popupProfile.querySelector('.popup__exit');
const formProfile = popupProfile.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_theme_name');
const jobInput = popupProfile.querySelector('.popup__input_theme_job');
const popupCards = document.querySelector('.popup_issue_cards');
const exitCards = popupCards.querySelector('.popup__exit');
const formCards = popupCards.querySelector('.popup__form');
const titleInput = popupCards.querySelector('.popup__input_theme_title');
const linkInput = popupCards.querySelector('.popup__input_theme_link');
const cards = document.querySelector('.cards');
const cardsContainer = cards.querySelector('.cards-grid');
const popupImage = document.querySelector('.popup_issue_image');
const exitImage = popupImage.querySelector('.popup__exit');
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
initialCards.forEach(function(item) {
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  cardElement.querySelector('.cards-grid__image').src = item.link;
  cardElement.querySelector('.cards-grid__title').textContent = item.name;
  cardsContainer.prepend(cardElement);
});

function editProfile() {
  popupProfile.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}
function addCards() {
  popupCards.classList.add('popup_opened');
  linkInput.value = '';
  titleInput.value = '';
}
function exitPopupProfile() {
  popupProfile.classList.remove('popup_opened');
}
function exitPopupCards() {
  popupCards.classList.remove('popup_opened');
}
function exitPopupImage() {
  popupImage.classList.remove('popup_opened');
}
function formProSubmitHandler(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  exitPopupProfile();
}
function formCaSubmitHandler(evt) {
  evt.preventDefault();
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  cardElement.querySelector('.cards-grid__image').src = linkInput.value;
  cardElement.querySelector('.cards-grid__title').textContent = titleInput.value;
  cardsContainer.prepend(cardElement);
  exitPopupCards();
}
function  clickCard(evt) {
  if (evt.target.classList.contains('cards-grid__icon')) {
    evt.target.classList.toggle('cards-grid__icon_active');
  } else if (evt.target.classList.contains('cards-grid__trash')) {
    evt.target.closest('.cards-grid__item').remove();
  } else if (evt.target.classList.contains('cards-grid__image')) {
    popupImage.classList.add('popup_opened');
    popupImage.querySelector('.popup__image').src = evt.target.src;
    popupImage.querySelector('.popup__image-caption').textContent = evt.target.closest('.cards-grid__item').querySelector('.cards-grid__title').textContent;
  }
}

edit.addEventListener('click', editProfile);
exitProfile.addEventListener('click', exitPopupProfile);
add.addEventListener('click', addCards);
exitCards.addEventListener('click', exitPopupCards);
formProfile.addEventListener('submit', formProSubmitHandler);
formCards.addEventListener('submit', formCaSubmitHandler);
cards.addEventListener('click', clickCard);
exitImage.addEventListener('click', exitPopupImage);

