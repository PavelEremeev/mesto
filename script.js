import { Card } from "./Card.js";
const elements = document.querySelector(".elements");
const submitButton = document.querySelector(".popup__submit-button");
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const closeButtonNewPlace = document.querySelector(
  ".popup__close-button_new-place"
);
const closeButtonZoom = document.querySelector(".popup__close-button_zoom");
const addButton = document.querySelector(".profile__add-button");
const textProfile = document.querySelector(".profile__text");
const subtextProfile = document.querySelector(".profile__subtext");
const nameInput = document.querySelector(".popup__input_name");
const jobInput = document.querySelector(".popup__input_job");
const placeInput = document.querySelector(".popup__input_new-place_name");
const linkInput = document.querySelector(".popup__input_new-place_link");
const popup = document.querySelector(".popup");
const popupZoom = document.querySelector(".popup_zoom");
const popupNewPlace = document.querySelector(".popup_new-place");
const formElement = document.querySelector(".popup__form");
const formElementNewPlace = document.querySelector(".popup__form_new-place");

// Render cards
const cards = [
  {
    name: "Париж",
    link:
      "https://images.unsplash.com/photo-1562815243-3e7c83b4b4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
  },
  {
    name: "Сидней",
    link:
      "https://images.unsplash.com/photo-1525755596908-8f1446d13044?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80",
  },
  {
    name: "Тула",
    link: "https://versiya.info/uploads/posts/2017-12/1512743766_40.jpg",
  },
  {
    name: "Москва",
    link:
      "https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  },
  {
    name: "Бали",
    link:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const renderCards = (cards) => {
  cards.forEach((item) => {
    const card = new Card(item, ".element__template");
    const cardElement = card.generateCard();

    document.querySelector(".elements").prepend(cardElement);
  });
};

renderCards(cards);

// Открытие поп-ап
function openPopup(popupName) {
  addPopupCloseEvents();
  popupName.classList.add("popup_opened");
}

// Закрытие поп-ап
function closePopup(popupName) {
  removePopupCloseEvents();
  popupName.classList.remove("popup_opened");
}

//  Закрытие по нажатию на Esc и оверлей
function closePopupAtEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupAtOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// поп-ап редактирования профиля
function editPopup() {
  nameInput.value = textProfile.textContent;
  jobInput.value = subtextProfile.textContent;
  hideInputErrors(formElement, validationConfig);
  openPopup(popup);
}

// Открытие поп-ап нового места
function editPopupNewPlace() {
  placeInput.value = null;
  linkInput.value = null;
  hideInputErrors(formElement, validationConfig);
  setButtonInactive(submitButton, validationConfig);
  openPopup(popupNewPlace);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault();
  textProfile.textContent = nameInput.value;
  subtextProfile.textContent = jobInput.value;
  closePopup(popup);
}

// Обработчик добавления новых карточек.
function formAddHandler(evt) {
  evt.preventDefault();
  const card = new Card(
    { name: placeInput.value, link: linkInput.value },
    ".element__template"
  );
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
  closePopup(popupNewPlace);
}

// Добавление  слушателей Esc и оверлей
export function addPopupCloseEvents() {
  document.addEventListener("mousedown", closePopupAtOverlay);
  document.addEventListener("keydown", closePopupAtEsc);
}

// Cнятие слушателей Esc и оверлей
export function removePopupCloseEvents() {
  document.removeEventListener("mousedown", closePopupAtOverlay);
  document.removeEventListener("keydown", closePopupAtEsc);
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
