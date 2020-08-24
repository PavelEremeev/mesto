import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { submitForm }) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._formElement = this._popupElement.querySelector(".popup__form");
    console.log(this._formElement);
  }

  open() {
    super.open();
  }

  _getInputValues() {
    this._formValues = {};
    this._allInputs = Array.from(
      this._formElement.querySelectorAll(".popup__input")
    );
    this._allInputs.forEach((item) => {
      this._formValues[item.name] = item.value;
    });
    console.log(this._formValues);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
