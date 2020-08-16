export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
  }
  open() {
    this._addPopupCloseEvents();
    this._popupElement.classList.add("popup_opened");
  }

  close() {
    this._removePopupCloseEvents();
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscToClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayToClose(evt) {
    if (evt.target === this._popupElement) {
      this.close();
    }
  }

  _addPopupCloseEvents() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscToClose(evt);
    });
    document.addEventListener("mousedown", (evt) => {
      this._handleOverlayToClose(evt);
    });
  }

  _removePopupCloseEvents() {
    document.removeEventListener("keydown", (evt) => {
      this._handleEscToClose(evt);
    });
    document.removeEventListener("mousedown", (evt) => {
      this._handleOverlayToClose(evt);
    });
  }

  setEventListeners() {
    const closeButton = this._popupElement.querySelector(
      ".popup__close-button"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });
  }
}
