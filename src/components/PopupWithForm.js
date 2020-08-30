import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._submitElement = this._popupElement.querySelector(".popup__submit-button")
  }

  _getInputValues() {
    this._formValues = {};
    this._allInputs = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._allInputs.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._submitForm(this._getInputValues());
    });
  }

  updateSubmitButtonTitle(text) {
    this._submitElement.textContent = text;
  }

  close() {
    super.close();
    setTimeout(() => {
      console.log('Данные формы сброшены');
      this._formElement.reset();
    }, 1000);
  }
}
