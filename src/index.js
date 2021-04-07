import Card from './Card.js';
import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import {
  initialCards,
  settings,
  popups,
  profileEditOpenButton,
  cardAddOpenButton,
  popupProfile,
  nameInput,
  jobInput,
  popupCards,
  cardsContainer
} from './constants.js';

const popupProfileValidClass = new FormValidator(settings, popupProfile);
const popupCardsValidClass = new FormValidator(settings, popupCards);
const userInfoClass = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});
const popupProfileFormClass = new PopupWithForm('.popup_issue_profile', {
  handleFormSubmit: ({name, job}) => {
    userInfoClass.setUserInfo({name, job});
    console.log(name, job);
    popupProfileFormClass.close();
  }
});
const newCards = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = new Card(item, '#card',{
        handleCardClick: (element) => {
          popupImageClass.setEventListeners();
          popupImageClass.open(element);
        }
      });
      newCards.addItem(card.createCard());
    }
  },
  '.cards-grid');
const popupCardsFormClass = new PopupWithForm('.popup_issue_cards', {
  handleFormSubmit: ({title, link}) => {
    const card = new Card(
      {title, link},
      '#card',
      {
        handleCardClick: (element) => {
          popupImageClass.setEventListeners();
          popupImageClass.open(element);
        }
      });
    popupCardsFormClass.close();
    cardsContainer.prepend(card.createCard());
  }
});
const popupImageClass = new PopupWithImage('.popup_issue_image');
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card',{
        handleCardClick: (element) => {
          popupImageClass.setEventListeners();
          popupImageClass.open(element);
        }
      });
      defaultCardList.addItem(card.createCard());
    }
  },
  '.cards-grid');

popupProfileFormClass.setEventListeners();
popupCardsFormClass.setEventListeners();

function openPropfilePopup() {
  const inputData = userInfoClass.getUserInfo();
  nameInput.value = inputData.name;
  jobInput.value = inputData.job;
  popupProfileValidClass.enableValidation();
  popupProfileFormClass.open();
}
function openCardsPopup() {
  popupCardsValidClass.enableValidation();
  popupCardsFormClass.open();
}

defaultCardList.renderItems();

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      popup.classList.remove('popup_opened');
      popup.querySelector('.popup__form').reset();
    }
  });
});

profileEditOpenButton.addEventListener('click', openPropfilePopup);
cardAddOpenButton.addEventListener('click', openCardsPopup);
