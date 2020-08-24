export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }
  getUserInfo() {
    const userInfo = {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
    return userInfo;
  }
  setUserInfo({ name, description }) {
    this._profileName.textContent = name;
    this._profileDescription.textContent = description;
  }
}
