import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
    this._popupCaption = document.querySelector(".popup__caption");
  }

  open(item) {
    this._imageElement.src = item.link;
    this._imageElement.alt = item.name;

    this._popupCaption.textContent = this._imageElement.alt;

    super.open();
  }
  close() {
    super.close();
  }
}
