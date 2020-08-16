import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
  }

  open(data) {
    if (data) {
      this._fillForm(data);
    }

    super.open();
  }

  _fillForm(data) {
    //
  }

  _getInputValues() {
    this._formValues = {};
    this._allInputs = Array.from(
      this._popupSelector.querySelectorAll(".popup__input")
    );
    this._allInputs.forEach((input) => {
      this._formValues[input.name] = [input.value];
    });
    return this._formValues;
  }

  /**
   * {
   *  name: Card1
   *  link: https://...
   * }
   */

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupSelector.querySelector(".popup__form").reset();
  }
}
