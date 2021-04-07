export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    this._title = document.querySelector(nameSelector);
    this._subtitle = document.querySelector(jobSelector);
  }
  getUserInfo() {
    return {
      name: this._title.textContent,
      job: this._subtitle.textContent
    }
  }
  setUserInfo({name, job}) {
    this._title.textContent = name;
    this._subtitle.textContent = job;
  }
}
