import {
  elements,
  editButton,
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
  popup,
  popupZoom,
  popupNewPlace,
  formElement,
  formElementNewPlace,
  validationConfig,
  cards,
  popupSelector,
} from "./constants.js";
import {
  openPopup,
  closePopup,
  addPopupCloseEvents,
  removePopupCloseEvents,
} from "./utils.js";
import Popup from "./Popup.js";
import Card from "./Card.js";
import Section from "./Section.js";
import { FormValidator } from "./FormValidator.js";

// Рендер карточек

const cardList = new Section(
  {
    data: cards,
    renderer: (item) => {
      const card = new Card(item, ".element__template");
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  elements
);

const popupProfile = new Popup(popupSelector.popupProfile);

//function renderCard(item) {
//  const card = new Card(item, ".element__template");
//  const cardElement = card.generateCard();
//
//  elements.prepend(cardElement);
//}

//function renderCards(cards) {
//  cards.forEach(renderCard);
//}

//renderCards(cards);

// Cоздание экземпляров для валидации форм

const validatorPopupProfile = new FormValidator(validationConfig, formElement);

const validatorNewPlace = new FormValidator(
  validationConfig,
  formElementNewPlace
);
// Валидация посредством вызова публичного метода для данного экземпляра класса
validatorPopupProfile.enableValidation();
validatorNewPlace.enableValidation();

// Редактирование поп-ап профиля
function editPopup() {
  // @ts-ignore
  nameInput.value = textProfile.textContent;
  // @ts-ignore
  jobInput.value = subtextProfile.textContent;

  openPopup(popup);
}

// Редактирование поп-ап нового места
function editPopupNewPlace() {
  // @ts-ignore
  placeInput.value = null;
  // @ts-ignore
  linkInput.value = null;

  validatorNewPlace.toggleButtonState();
  openPopup(popupNewPlace);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  // @ts-ignore
  textProfile.textContent = nameInput.value;
  // @ts-ignore
  subtextProfile.textContent = jobInput.value;
  closePopup(popup);
}

// Обработчик добавления новых карточек.
function formAddHandler(evt) {
  evt.preventDefault();
  // @ts-ignore
  renderCard({ name: placeInput.value, link: linkInput.value });
  closePopup(popupNewPlace);
}

// Cлушатели сабмитов
formElement.addEventListener("submit", formSubmitHandler);
formElementNewPlace.addEventListener("submit", formAddHandler);

// Слушатели
editButton.addEventListener("click", editPopup);
closeButton.addEventListener("click", () => {
  closePopup(popup);
});
addButton.addEventListener("click", editPopupNewPlace);
closeButtonNewPlace.addEventListener("click", () => {
  closePopup(popupNewPlace);
});
closeButtonZoom.addEventListener("click", () => {
  closePopup(popupZoom);
});
