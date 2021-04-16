export default class UserInfo {
  constructor({nameSelector, jobSelector, avatarSelector}) {
    this._title = document.querySelector(nameSelector);
    this._subtitle = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getMyId() {
    return this._myId
  }
  saveMyId(num) {
    this._myId = num;
  }
  getUserInfo() {
    return {
      name: this._title.textContent,
      job: this._subtitle.textContent
    }
  }
  setAvatar({avatar}) {
    this._avatar.style.backgroundImage = `url(${avatar})`;
  }
  setUserInfo({name, about}) {
    this._title.textContent = name;
    this._subtitle.textContent = about;
  }
}
