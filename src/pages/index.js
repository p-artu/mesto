import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import {
  initialCards,
  settings,
  profileEditOpenButton,
  cardAddOpenButton,
  nameInput,
  jobInput,
  formCards,
  formProfile
} from '../utils/constants.js';
import {getAltByLink} from '../utils/utils.js';

const popupProfileValidClass = new FormValidator(settings, formProfile);
const popupCardsValidClass = new FormValidator(settings, formCards);
const userInfoClass = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle'
});
const popupProfileFormClass = new PopupWithForm('.popup_issue_profile', {
  handleFormSubmit: ({name, job}) => {
    userInfoClass.setUserInfo({name, job});
    popupProfileFormClass.close();
  }
});
const popupCardsFormClass = new PopupWithForm('.popup_issue_cards', {
  handleFormSubmit: ({title, link}) => {
    const card = new Card(
      {title, link},
      '#card',
      {
        handleCardClick: (title, link) => {
          popupImageClass.open(title, link);
        }
      },
      getAltByLink);
    popupCardsFormClass.close();
    defaultCardList.prependItem(card.createCard());
  }
});
const popupImageClass = new PopupWithImage('.popup_issue_image', getAltByLink);
const defaultCardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '#card',{
        handleCardClick: (title, link) => {
          popupImageClass.open(title, link);
        }
      },
      getAltByLink);
      defaultCardList.addItem(card.createCard());
    }
  },
  '.cards-grid');

function openPropfilePopup() {
  const inputData = userInfoClass.getUserInfo();
  nameInput.value = inputData.name;
  jobInput.value = inputData.job;
  popupProfileValidClass.resetValidation();
  popupProfileFormClass.open();
}
function openCardsPopup() {
  popupCardsValidClass.resetValidation();
  popupCardsFormClass.open();
}

popupImageClass.setEventListeners();
popupCardsValidClass.enableValidation();
popupProfileValidClass.enableValidation();
popupProfileFormClass.setEventListeners();
popupCardsFormClass.setEventListeners();
defaultCardList.renderItems();

profileEditOpenButton.addEventListener('click', openPropfilePopup);
cardAddOpenButton.addEventListener('click', openCardsPopup);
