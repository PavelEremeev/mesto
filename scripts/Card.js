export default class Card {
  constructor(item, templateSelector, { handleCardClick }) {
    this._item = item;
    this._title = item.name;
    this._image = item.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    // @ts-ignore
    const deleteElement = event.target.closest(".element");
    // removePopupCloseEvents();
    deleteElement.remove();
    deleteElement.innerHTML = " ";
  }

  _handleImageElementClick(cardElemImg) {
    const popupCaption = document.querySelector(".popup__caption");
    popupCaption.textContent = this._title;
    this._handleCardClick(this._item);
  }
}
