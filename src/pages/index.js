import './index.css';

import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import {
  settings,
  profileEditOpenButton,
  cardAddOpenButton,
  avatarEditOpenButton,
  nameInput,
  jobInput,
  formCards,
  buttonCards,
  formProfile,
  buttonProfile,
  formAvatar,
  buttonAvatar,
  formDelete
} from '../utils/constants.js';
import {getAltByLink} from '../utils/utils.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22',
  headers: {
    authorization: 'e9422111-6eab-4cf8-a1a0-42cc93c48430',
    'Content-Type': 'application/json'
  }
});
const popupProfileValidClass = new FormValidator(settings, formProfile);
const popupCardsValidClass = new FormValidator(settings, formCards);
const popupAvatarValidClass = new FormValidator(settings, formAvatar);
const popupTrashValidClass = new FormValidator(settings, formDelete);
const userInfoClass = new UserInfo({
  nameSelector: '.profile__title',
  jobSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar'
});
const popupProfileFormClass = new PopupWithForm('.popup_issue_profile', {
  handleFormSubmit: ({name, about}) => {
    buttonProfile.textContent = 'Сохранение...';
    api.editUserInfo({name, about})
    .then(result => {
      userInfoClass.setUserInfo(result);
      popupProfileFormClass.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonProfile.textContent = 'Сохранить';
    });;
  }
});
let excessCard;
function createCard({name, link, likes, owner, _id}) {
  const myId = userInfoClass.getMyId();
  const card = new Card({
    infoData: {name, link, likes, owner, _id, myId},
    templateSelector: '#card',
    callbackData: {
      handleCardImageClick: (name, link) => {
        popupImageClass.open(name, link);
      },
      handleCardTrashClick: () => {
        excessCard = card;
        popupTrashFormClass.open();
      },
      handleCardLikeClick: (element) => {
        const cardId = card.getCardId();
        if (element.classList.contains('cards-grid__icon_active')) {
          api.cancelLike(cardId)
          .then(() => {
            card.likeCard();
            card.cancelLike();
          })
          .catch(err => {
            console.log(err);
          });
        } else {
          api.setLike(cardId)
          .then(() => {
            card.likeCard();
            card.addLike();
          })
          .catch(err => {
            console.log(err);
          });
        }
      }
    },
    getAltByLink
  })
  return card
}
const popupCardsFormClass = new PopupWithForm('.popup_issue_cards', {
  handleFormSubmit: ({name, link}) => {
    buttonCards.textContent = 'Сохранение...';
    api.setNewCard({name, link})
    .then(result => {
      const card = createCard(result);
      popupCardsFormClass.close();
      defaultCardList.prependItem(card.createCard());
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonCards.textContent = 'Создать';
    });
  }
});
const popupAvatarFormClass = new PopupWithForm('.popup_issue_avatar', {
  handleFormSubmit: ({avatar}) => {
    buttonAvatar.textContent = 'Сохранение...';
    api.editAvatar({avatar})
    .then(result => {
      userInfoClass.setAvatar(result);
      popupAvatarFormClass.close();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      buttonAvatar.textContent = 'Сохранить';
    });
  }
});
const popupTrashFormClass = new PopupWithForm('.popup_issue_delete', {
  handleFormSubmit: () => {
    const cardId = excessCard.getCardId();
    api.deleteCard(cardId)
    .then(() => {
      excessCard.deleteCard();
      popupTrashFormClass.close();
    })
    .catch(err => {
      console.log(err);
    });
  }
});
const popupImageClass = new PopupWithImage('.popup_issue_image', getAltByLink);
const defaultCardList = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
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
function openAvatarPopup() {
  popupAvatarValidClass.resetValidation();
  popupAvatarFormClass.open();
}

popupImageClass.setEventListeners();
popupTrashFormClass.setEventListeners();
popupCardsValidClass.enableValidation();
popupProfileValidClass.enableValidation();
popupAvatarValidClass.enableValidation();
popupTrashValidClass.enableValidation();
popupProfileFormClass.setEventListeners();
popupCardsFormClass.setEventListeners();
popupAvatarFormClass.setEventListeners();
api.getAllInfo()
.then(([user, cards]) => {
  userInfoClass.setUserInfo(user);
  userInfoClass.setAvatar(user);
  userInfoClass.saveMyId(user._id);
  defaultCardList.renderItems(cards);
})
.catch(err => {
  console.log(err);
});

profileEditOpenButton.addEventListener('click', openPropfilePopup);
cardAddOpenButton.addEventListener('click', openCardsPopup);
avatarEditOpenButton.addEventListener('click', openAvatarPopup);
