import {
  containerSelector,
  templateSelector,
  //elements,
  editButton,
  // submitButton,
  // closeButton,
  // closeButtonNewPlace,
  // closeButtonZoom,
  addButton,
  // textProfile,
  // subtextProfile,
  nameInput,
  jobInput,
  // placeInput,
  // linkInput,
  // popup,
  // popupZoom,
  // popupNewPlace,
  formElement,
  formElementNewPlace,
  validationConfig,
  cards,
  popupSelector,
} from "./constants.js";
import Popup from "./Popup.js";
import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Создания экземпляра класса с инфо. попап-профиля
const userInfoProfile = new UserInfo({
  nameSelector: ".profile__text",
  descriptionSelector: ".profile__subtext",
});

// Получение значений попап-профиля
function getUserInputs() {
  const userInfo = userInfoProfile.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.description;
  console.log(userInfo);
}

// Cоздания экземпляра для рендеринга изначальнного массива карточек
const cardList = new Section(
  {
    data: cards,
    renderer: (item) => {
      const card = new Card(item, templateSelector.elementTemplate, {
        handleCardClick: () => {
          popupZoom.open(item);
          console.log(item);
        },
      });
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  containerSelector.elements
);
// Cоздания экземпляра попап-изображения
const popupZoom = new PopupWithImage(popupSelector.popupZoom);
// Наложение слушателей событий
popupZoom.setEventListeners();

// Рендеринг карточек
cardList.renderItems();

function createCardElement(item) {
  const card = new Card(item, templateSelector.elementTemplate, {
    handleCardClick: () => {
      popupZoom.open(item);
      console.log(item);
    },
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// Создания экземепляра попап-профиля
const popupProfile = new Popup(popupSelector.popupProfile);
popupProfile.setEventListeners();
// Cоздания экземпляра попап-нового места
const popupNewPlace = new Popup(popupSelector.popupNewPlace);
// Наложение слушателей событий
popupNewPlace.setEventListeners();

// Создания экземпляра формы для добавления карточки
const popupNewPlaceForm = new PopupWithForm(popupSelector.popupNewPlace, {
  submitForm: (formData) => {
    createCardElement(formData);
    popupNewPlaceForm.close();
    console.log(formData);
  },
});
// Наложение слушателей событий
popupNewPlaceForm.setEventListeners();

// Создания экземпляра формы для профиля
const popupProfileForm = new PopupWithForm(popupSelector.popupProfile, {
  submitForm: (formData) => {
    userInfoProfile.setUserInfo(formData);
    popupProfileForm.close();
    console.log(formData);
  },
});
popupProfileForm.setEventListeners();

// Наложение слушателей событий
editButton.addEventListener("click", () => {
  validatorPopupProfile.hideInputErrors();
  getUserInputs();
  popupProfile.open();
});
addButton.addEventListener("click", () => {
  validatorNewPlace.hideInputErrors();
  validatorNewPlace.toggleButtonState();
  popupNewPlaceForm.open();
});
//submitButton.addEventListener("click", () => {});

// Cоздание экземпляров для валидации форм
const validatorPopupProfile = new FormValidator(validationConfig, formElement);

const validatorNewPlace = new FormValidator(
  validationConfig,
  formElementNewPlace
);
// Валидация посредством вызова публичного метода для данного экземпляра класса
validatorPopupProfile.enableValidation();
validatorNewPlace.enableValidation();
