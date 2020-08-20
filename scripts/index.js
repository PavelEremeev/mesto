import {
  containerSelector,
  templateSelector,
  //elements,
  editButton,
  submitButton,
  closeButton,
  closeButtonNewPlace,
  closeButtonZoom,
  addButton,
  textProfile,
  subtextProfile,
  nameInput,
  jobInput,
  placeInput,
  linkInput,
  // popup,
  // popupZoom,
  // popupNewPlace,
  formElement,
  formElementNewPlace,
  validationConfig,
  cards,
  popupSelector,
} from "./constants.js";
// import {
//   openPopup,
//   closePopup,
//   addPopupCloseEvents,
//   removePopupCloseEvents,
// } from "./utils.js";
import Popup from "./Popup.js";
import Card from "./Card.js";
import Section from "./Section.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Создания экземпляра класса с инфо. попап-профиля
const userInfoProfile = new UserInfo({
  nameSelector: textProfile,
  descriptionSelector: subtextProfile
});



// Cоздания экземпляра для рендеринга изначальнного массива карточек
const cardList = new Section(
  {
    data: cards,
    renderer: (item) => {
      const card = new Card(item, templateSelector.elementTemplate, {
        handleCardClick: () => {
          popupZoom.open(item);
        },
      });
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  containerSelector.elements
);

// Рендеринг карточек
cardList.renderItems();

function createCardElement(data) {
  const card = new Card(data, templateSelector.elementTemplate, {
    handleCardClick: () => {
      popupZoom.open(data);
    },
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

// Создания экземепляра попап-профиля
const popupProfile = new Popup(popupSelector.popupProfile);

// Cоздания экземпляра попап-нового места
const popupNewPlace = new Popup(popupSelector.popupNewPlace);

// Создания экземпляра формы для добавления карточки
const popupNewPlaceForm = new PopupWithForm(
  popupSelector.popupNewPlace,
  (formData) => {
    createCardElement(formData);
    popupNewPlaceForm.close();
  }
);

// Создания экземпляра формы для профиля

const popupProfileForm = new PopupWithForm(
  popupSelector.popupProfile, (formData) => {
    userInfoProfile.setUserInfo(formData);
    popupProfileForm.close();
  }
)

// Cоздания экземпляра попап-изображения
const popupZoom = new PopupWithImage(popupSelector.popupZoom);

// Наложение слушателей событий
popupProfile.setEventListeners();
popupNewPlace.setEventListeners();
popupZoom.setEventListeners();
editButton.addEventListener("click", () => {

  popupProfile.open();
});
addButton.addEventListener("click", () => {
  validatorNewPlace.toggleButtonState();
  popupNewPlaceForm.open();
});

// хз что тут можно сделать
submitButton.addEventListener("click", () => {
  popupNewPlaceForm.setEventListeners();
});




// Cоздание экземпляров для валидации форм
const validatorPopupProfile = new FormValidator(validationConfig, formElement);

const validatorNewPlace = new FormValidator(
  validationConfig,
  formElementNewPlace
);
// Валидация посредством вызова публичного метода для данного экземпляра класса
validatorPopupProfile.enableValidation();
validatorNewPlace.enableValidation();

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
// function formSubmitHandler(evt) {
//   evt.preventDefault();
//   // @ts-ignore
//   textProfile.textContent = nameInput.value;
//   // @ts-ignore
//   subtextProfile.textContent = jobInput.value;
//   closePopup(popup);
// }

// // Обработчик добавления новых карточек.
// function formAddHandler(evt) {
//   evt.preventDefault();
//   // @ts-ignore
//   renderCard({ name: placeInput.value, link: linkInput.value });
//   closePopup(popupNewPlace);
// }

// Cлушатели сабмитов
// formElement.addEventListener("submit", formSubmitHandler);
// formElementNewPlace.addEventListener("submit", formAddHandler);

// Слушатели
// editButton.addEventListener("click", editPopup);
// closeButton.addEventListener("click", () => {
//  closePopup(popup);
// });
// addButton.addEventListener("click", editPopupNewPlace);
// closeButtonNewPlace.addEventListener("click", () => {
//  closePopup(popupNewPlace);
// });
// closeButtonZoom.addEventListener("click", () => {
//  closePopup(popupZoom);
// });
