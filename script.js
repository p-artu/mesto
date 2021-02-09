let edit = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let exit = document.querySelector('.popup__exit');
let heartIcon = document.querySelectorAll('.cards-grid__icon');
let title = document.querySelector('.profile__title');
let subtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');

function editProfile() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  title.textContent = nameInput.value;
  subtitle.textContent = jobInput.value;
  editProfile();
}



function activeHeartA() {
  heartIcon[0].classList.toggle('cards-grid__icon_active')
}
function activeHeartB() {
  heartIcon[1].classList.toggle('cards-grid__icon_active')
}
function activeHeartC() {
  heartIcon[2].classList.toggle('cards-grid__icon_active')
}
function activeHeartD() {
  heartIcon[3].classList.toggle('cards-grid__icon_active')
}
function activeHeartE() {
  heartIcon[4].classList.toggle('cards-grid__icon_active')
}
function activeHeartF() {
  heartIcon[5].classList.toggle('cards-grid__icon_active')
}

nameInput.setAttribute('value', title.textContent);
jobInput.setAttribute('value', subtitle.textContent);

edit.addEventListener('click', editProfile);
exit.addEventListener('click', editProfile);
heartIcon[0].addEventListener('click', activeHeartA);
heartIcon[1].addEventListener('click', activeHeartB);
heartIcon[2].addEventListener('click', activeHeartC);
heartIcon[3].addEventListener('click', activeHeartD);
heartIcon[4].addEventListener('click', activeHeartE);
heartIcon[5].addEventListener('click', activeHeartF);

formElement.addEventListener('submit', formSubmitHandler);
