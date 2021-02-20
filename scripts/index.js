const profileEditOpenButton = document.querySelector('.profile__edit');
const cardAddOpenButton = document.querySelector('.profile__add');
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
const cardTemplate = document.querySelector('#card').content;

function createCard(card) {
  const cardElement = cardTemplate.querySelector('.cards-grid__item').cloneNode(true);
  cardElement.querySelector('.cards-grid__image').src = card.link;
  cardElement.querySelector('.cards-grid__title').textContent = card.name;
  return cardElement
}
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
function openPropfilePopup() {
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
  openPopup(popupProfile);
}
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  closePopup(popupProfile);
}
function handleCardFormSubmit(evt) {
  evt.preventDefault();
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
  openPopup(popupImage);
  popupImage.querySelector('.popup__image').src = element.src;
  popupImage.querySelector('.popup__image-caption').textContent = element.closest('.cards-grid__item').querySelector('.cards-grid__title').textContent;
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

profileEditOpenButton.addEventListener('click', openPropfilePopup);
exitProfile.addEventListener('click', () => closePopup(popupProfile));
cardAddOpenButton.addEventListener('click', () => openPopup(popupCards));
exitCards.addEventListener('click', () => closePopup(popupCards));
formProfile.addEventListener('submit', handleProfileFormSubmit);
formCards.addEventListener('submit', handleCardFormSubmit);
cards.addEventListener('click', clickCard);
exitImage.addEventListener('click', () => closePopup(popupImage));

