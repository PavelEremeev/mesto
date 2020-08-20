export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileJob.textContent
    }
    return userInfo;
  }
  setUserInfo({ name, description }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = description;
  }
}
