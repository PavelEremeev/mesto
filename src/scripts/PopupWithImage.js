import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector(".popup__image");
  }

  open(item) {
    this._imageElement.src = item.link;
    this._imageElement.alt = item.name;
    super.open();
  }
  close() {
    super.close();
  }
}
