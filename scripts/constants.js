export const containerSelector = { elements: ".elements" };
export const templateSelector = { elementTemplate: ".element__template" };
//export const elements = document.querySelector(".elements");
//export const submitButton = document.querySelector(".popup__submit-button");
export const editButton = document.querySelector(".profile__edit-button");
export const closeButton = document.querySelector(".popup__close-button");
export const closeButtonNewPlace = document.querySelector(
  ".popup__close-button_new-place"
);
export const closeButtonZoom = document.querySelector(
  ".popup__close-button_zoom"
);
export const addButton = document.querySelector(".profile__add-button");
export const textProfile = document.querySelector(".profile__text");
export const subtextProfile = document.querySelector(".profile__subtext");
export const nameInput = document.querySelector(".popup__input_name");
export const jobInput = document.querySelector(".popup__input_job");
export const placeInput = document.querySelector(
  ".popup__input_new-place_name"
);
export const linkInput = document.querySelector(".popup__input_new-place_link");
export const popupSelector = {
  popupProfile: ".popup",
  popupZoom: ".popup_zoom",
  popupNewPlace: ".popup_new-place",
};
//export const popup = document.querySelector(".popup");
//export const popupZoom = document.querySelector(".popup_zoom");
//export const popupNewPlace = document.querySelector(".popup_new-place");
export const formElement = document.querySelector(".popup__form");
export const formElementNewPlace = document.querySelector(
  ".popup__form_new-place"
);
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  inputErrorSelector: ".popup__input_type_error",
  errorClass: "popup__input-error_active",
};
export const cards = [
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
