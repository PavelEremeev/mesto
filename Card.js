import { addPopupCloseEvents, removePopupCloseEvents } from "./index.js";
class Card {
  constructor(item, templateSelector) {
    this._title = item.name;
    this._image = item.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardElementImage = this._element.querySelector(".element__image");
    const cardElementText = this._element.querySelector(".element__text");

    cardElementText.textContent = this._title;
    cardElementImage.src = this._image;
    cardElementImage.alt = cardElementText.textContent;

    return this._element;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector(".element__like-button");
    const removeButton = this._element.querySelector(".element__remove-button");
    const cardElementImage = this._element.querySelector(".element__image");

    likeButton.addEventListener("click", this._handleLikeButtonClick);
    removeButton.addEventListener("click", this._handleRemoveButtonClick);
    cardElementImage.addEventListener("click", () =>
      this._handleImageElementClick(cardElementImage)
    );
  }

  _handleLikeButtonClick() {
    // @ts-ignore
    event.target.classList.toggle("element__like-button_active");
  }

  _handleRemoveButtonClick() {
    const deleteElement = event.target.closest(".element");
    removePopupCloseEvents();
    deleteElement.remove();
  }

  _handleImageElementClick() {
    const popupZoom = document.querySelector(".popup_zoom");
    const popupImage = document.querySelector(".popup__image");
    const popupCaption = document.querySelector(".popup__caption");
    popupZoom.classList.add("popup_opened");
    addPopupCloseEvents();
    popupImage.src = this._image;
    popupCaption.textContent = this._title;
  }
}

export { Card };
