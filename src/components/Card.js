export default class Card {
  constructor(
    item,
    templateSelector,
    {
      handleCardClick,
      handleCardLikeClick,
      // handleCardDisLikeClick,
      handleCardDeleteClick,
      currentUserId,
    }
  ) {
    this._item = item;
    this._title = item.name;
    this._image = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._currentUserId = currentUserId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardLikeClick = handleCardLikeClick;
    // this._handleCardDisLikeClick = handleCardDisLikeClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector(".element__image");
    this._elementRemoveButton = this._element.querySelector(
      ".element__remove-button"
    );
    this._elementLikeButton = this._element.querySelector(
      ".element__like-button"
    );
    this._elementLikeCounter = this._element.querySelector(
      ".element__like-counter"
    );
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._setEventListeners();
    const cardElementText = this._element.querySelector(".element__text");

    cardElementText.textContent = this._title;
    this._elementImage.src = this._image;
    this._elementImage.alt = cardElementText.textContent;

    return this._element;
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener("click", (evt) => {
      this._handleLikeButtonClick(evt);
    });
    this._elementRemoveButton.addEventListener("click", () => {
      this._handleRemoveButtonClick();
    });
    this._elementImage.addEventListener("click", () =>
      this._handleImageElementClick()
    );
  }

  _handleLikeButtonClick(evt) {
    this._handleCardLikeClick(evt);
    // this._elementLikeButton.classList.toggle("element__like-button_active");
    // if (this._elementLikeButton.contains("element__like-button_active")) {
    //   this._handleCardLikeClick(this._item);
    // } else {
    //   this._handleCardDisLikeClick(this._item);
    // }
  }

  removeCard() {
    // removePopupCloseEvents();
    this._element.remove();
  }

  _handleRemoveButtonClick() {
    this._handleCardDeleteClick(this._item);
  }

  _handleImageElementClick() {
    this._handleCardClick(this._item);
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    this._elementLikeCounter.textContent = this._likes.length;
  }

  isLiked() {
    const isLiked = (element) => element._id === this._currentUserId;
    return this._likes.some(isLiked);
  }
}
