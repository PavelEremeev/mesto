export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(`.${popupSelector}`);
  }
  open() {
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
  }
  _handleEscToClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  // Вообще хз как это сделать.
  _handleOverlayToClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("keydown", () => {
      this._handleEscToClose();
    });
    this._popupElement.addEventListener("mousedown", () => {
      this._handleOverlayToClose();
    });
  }
}
