export default class Card {
  constructor(
    item,
    templateSelector,
    { handleCardClick, handleCardLikeClick, handleCardDeleteClick, ownerId }
  ) {
    this._item = item;
    this._title = item.name;
    this._image = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._ownerId = ownerId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
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

    likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
    removeButton.addEventListener("click", () => {
      this._handleRemoveButtonClick();
    });
    cardElementImage.addEventListener("click", () =>
      this._handleImageElementClick(cardElementImage)
    );
  }

  _handleLikeButtonClick() {
    // @ts-ignore
    event.target.classList.toggle("element__like-button_active");
    this._handleCardLikeClick(this._item);
  }

  removeCard() {
    // removePopupCloseEvents();
    this._element.remove();
  }

  _handleRemoveButtonClick() {
    this._handleCardDeleteClick(this._item);
  }

  _handleImageElementClick(cardElemImg) {
    this._handleCardClick(this._item);
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._likeCounter.textContent = this._likes.length;
  }
}
