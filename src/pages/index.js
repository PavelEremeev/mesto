import "../pages/index.css";
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
  // cards,
  popupSelector,
  editAvatarButton,
  formElementAvatar,
} from "../utils/constants.js";
import Popup from "../components/Popup.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";
import PopupWithSubmit from "../components/PopupWithSubmit";

// Создание экземпляра класс API для взаимодействия с сервером
const apiManager = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "957c9aa7-6dd0-46ee-b746-30b25c4b69ab",
    "Content-Type": "application/json",
  },
});

// Создания экземпляра класса с инфо. попапа
const userInfoProfile = new UserInfo({
  nameSelector: ".profile__text",
  aboutSelector: ".profile__subtext",
  avatar: ".profile__avatar",
});

// Получение значений попапа
function getUserInputs() {
  const userInfo = userInfoProfile.getUserInfo();
  // @ts-ignore
  nameInput.value = userInfo.name;
  // @ts-ignore
  jobInput.value = userInfo.about;
}

// Cоздания экземпляра попап-изображения
const popupZoom = new PopupWithImage(popupSelector.popupZoom);
// Наложение слушателей событий
popupZoom.setEventListeners();

// Создания экземпляра попап-формы для профиля
const popupProfileForm = new PopupWithForm(popupSelector.popupProfile, {
  submitForm: (formData) => {
    console.log("Submitting...", formData);

    popupProfileForm.updateSubmitButtonTitle("Сохранение...");
    apiManager
      .updateUserInfo(formData)
      .then((serverUserInfo) => {
        console.log("User info is updated", serverUserInfo);

        userInfoProfile.setUserInfo(serverUserInfo);
        popupProfileForm.close();
      })
      .catch(() => {
        alert("Ошибка обновления");
      })
      .finally(() => {
        popupProfileForm.updateSubmitButtonTitle("Сохранить");
      });
  },
});
popupProfileForm.setEventListeners();

// Наложение слушателей событий
editButton.addEventListener("click", () => {
  validatorPopupProfile.hideInputErrors();
  getUserInputs();
  popupProfileForm.open();
});
editAvatarButton.addEventListener("click", () => {
  validatiorAvatar.hideInputErrors();
  getUserInputs();
  popupWithAvatar.open();
});

// Cоздание экземпляров для валидации форм
const validatorPopupProfile = new FormValidator(validationConfig, formElement);
const validatorNewPlace = new FormValidator(
  validationConfig,
  formElementNewPlace
);
const validatiorAvatar = new FormValidator(validationConfig, formElementAvatar);

// Валидация посредством вызова публичного метода для данного экземпляра класса
validatorPopupProfile.enableValidation();
validatorNewPlace.enableValidation();
validatiorAvatar.enableValidation();

// Создание экземпляра попап-подтверждения
const popupWithSubmit = new PopupWithSubmit(popupSelector.popupConfirm, {
  handleSubmitCallback: () => {
    console.log("Empty");
  },
});
popupWithSubmit.setEventListeners();

const popupWithAvatar = new PopupWithForm(popupSelector.popupAvatar, {
  submitForm: (formData) => {
    console.log("Submitting...", formData);

    popupWithAvatar.updateSubmitButtonTitle("Сохранение...");
    apiManager
      .updateUserImage(formData)
      .then((serverUserInfo) => {
        console.log("User info is updated", serverUserInfo);

        userInfoProfile.setUserInfo(serverUserInfo);
        popupWithAvatar.close();
      })
      .catch(() => {
        alert("Ошибка обновления");
      })
      .finally(() => {
        popupWithAvatar.updateSubmitButtonTitle("Сохранить");
      });
  },
});
popupWithAvatar.setEventListeners();

// Получение данных и карточек с сервера с помощью API
Promise.all([apiManager.getUserInfo(), apiManager.getItems()]).then(
  ([userInfo, cards]) => {
    const myId = userInfo._id;
    userInfoProfile.setUserInfo(userInfo);

    // Функция создания  карточки
    cards.reverse();
    function createCardElement(item) {
      const card = new Card(item, templateSelector.elementTemplate, {
        handleCardClick: () => {
          popupZoom.open(item);
        },
        handleCardLikeClick: (evt) => {
          const isLiked = card.isLiked();
          apiManager
            .rateItem(item._id, isLiked)
            .then((res) => {
              card.updateLikes(res.likes);
            })
            .then((_) => {
              evt.target.classList.toggle("element__like-button_active");
            })
            .catch((err) => console.log(err));
        },
        handleCardDeleteClick: (item) => {
          popupWithSubmit.setSubmitAction(() => {
            apiManager.deleteItem(item).then(() => {
              card.removeCard();
              popupWithSubmit.close();
            });
          }),
            popupWithSubmit.open();
        },
        // handleCardDisLikeClick: {},
        currentUserId: myId,
      });
      return card;
    }

    // Cоздания экземпляра для рендеринга массива карточек
    const cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          const card = createCardElement(item);
          const cardElement = card.generateCard();
          const isLiked = card.isLiked();
          if (item.owner._id != myId) {
            cardElement.querySelector(".element__remove-button").style.display =
              "none";
          }
          if (isLiked) {
            cardElement
              .querySelector(".element__like-button")
              .classList.add("element__like-button_active");
          }
          cardList.addItem(cardElement);
        },
      },
      containerSelector.elements
    );

    // Рендеринг карточек
    cardList.renderItems();

    // Создания экземпляра попап-формы для добавления карточки
    const popupNewPlaceForm = new PopupWithForm(popupSelector.popupNewPlace, {
      submitForm: (formData) => {
        console.log("Submitting...", formData);

        popupNewPlaceForm.updateSubmitButtonTitle("Добавление...");
        apiManager
          .createItem(formData)
          .then((serverItem) => {
            console.log("Card is added", serverItem);

            createCardElement(serverItem);
            popupNewPlaceForm.close();
          })
          .catch(() => {
            alert("Ошибка добавления");
          })
          .finally(() => {
            popupNewPlaceForm.updateSubmitButtonTitle("Создать mesto");
          });
      },
    });
    // Наложение слушателей событий
    popupNewPlaceForm.setEventListeners();

    addButton.addEventListener("click", () => {
      validatorNewPlace.hideInputErrors();
      validatorNewPlace.toggleButtonState();
      popupNewPlaceForm.open();
    });
  }
);
