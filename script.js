let edit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let exit = document.querySelector('.popup__exit');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_theme_name');
let jobInput = document.querySelector('.popup__input_theme_job');

function editProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = title.textContent;
  jobInput.value = subtitle.textContent;
}

function exitPopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  exitPopup();
}

edit.addEventListener('click', editProfile);
exit.addEventListener('click', exitPopup);
formElement.addEventListener('submit', formSubmitHandler);
