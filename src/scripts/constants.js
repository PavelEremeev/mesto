import paris from "../images/paris.jpg";
import sydney from "../images/sydney.jpg";
import tula from "../images/tula.jpg";
import moscow from "../images/moscow.jpg";
import bali from "../images/bali.jpg";
import baikal from "../images/baikal.jpg";

export const containerSelector = { elements: ".elements" };
export const templateSelector = { elementTemplate: ".element__template" };
//export const submitButton = document.querySelector(".popup__submit-button");
export const editButton = document.querySelector(".profile__edit-button");
export const closeButton = document.querySelector(".popup__close-button");
// export const closeButtonNewPlace = document.querySelector(
//   ".popup__close-button_new-place"
// );
// export const closeButtonZoom = document.querySelector(
//   ".popup__close-button_zoom"
// );
export const addButton = document.querySelector(".profile__add-button");
// export const textProfile = document.querySelector(".profile__text");
// export const subtextProfile = document.querySelector(".profile__subtext");
export const nameInput = document.querySelector(".popup__input_name");
export const jobInput = document.querySelector(".popup__input_job");
// export const placeInput = document.querySelector(
//   ".popup__input_new-place_name"
// );
// export const linkInput = document.querySelector(".popup__input_new-place_link");
export const popupSelector = {
  popupProfile: ".popup",
  popupZoom: ".popup_zoom",
  popupNewPlace: ".popup_new-place",
};

// export const submitButton = document.querySelector(".popup__submit-button");
// export const popup = document.querySelector(".popup");
// export const popupZoom = document.querySelector(".popup_zoom");
// export const popupNewPlace = document.querySelector(".popup_new-place");
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
    link: paris,
  },
  {
    name: "Сидней",
    link: sydney,
  },
  {
    name: "Тула",
    link: tula,
  },
  {
    name: "Москва",
    link: moscow,
  },
  {
    name: "Бали",
    link: bali,
  },
  {
    name: "Байкал",
    link: baikal,
  },
];
