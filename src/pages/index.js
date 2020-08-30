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
  cards,
  popupSelector,
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

const apiManager = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
  headers: {
    authorization: '957c9aa7-6dd0-46ee-b746-30b25c4b69ab',
    'Content-Type': 'application/json'
  }
});

// Создания экземпляра класса с инфо. попап-профиля
const userInfoProfile = new UserInfo({
  nameSelector: ".profile__text",
  descriptionSelector: ".profile__subtext",
});

// Получение значений попап-профиля
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
    console.log('Submitting...', formData);

    popupProfileForm.updateSubmitButtonTitle('Сохранение...');
    apiManager.updateUserInfo(formData)
      .then((serverUserInfo) => {
        console.log('User info is updated', serverUserInfo);

        userInfoProfile.setUserInfo(serverUserInfo);
        popupProfileForm.close();
      })
      .catch(() => {
        alert('Ошибка обновления');
      })
      .finally(() => {
        popupProfileForm.updateSubmitButtonTitle('Сохранить');
      });
  },
  // submitForm: (formData) => {
  //   console.log('Submitting...', formData);

  //   // Переделал метод, теперь callback "submitForm" возвращает Promise,
  //   // который будет ждать код PopupWithForm
  //   return apiManager.updateUserInfo(formData)
  //     .then(() => {
  //       console.log('User info is updated', formData);
  //       userInfoProfile.setUserInfo(formData);
  //       popupProfileForm.close();
  //     })
  //     .catch(() => {
  //       alert('Ошибка обновления');
  //     })
  // },
});
popupProfileForm.setEventListeners();

// Наложение слушателей событий
editButton.addEventListener("click", () => {
  validatorPopupProfile.hideInputErrors();
  getUserInputs();
  popupProfileForm.open();
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


// Создание экземпляра попап-подтверждения
const popupWithSubmit = new PopupWithSubmit(popupSelector.popupConfirm, {
  handleSubmitCallback: () => {
    console.log('Empty');
  }
})
popupWithSubmit.setEventListeners()

// Получение  карточек с сервера с помощью API

apiManager.getItems()
  .then(cards => {
    cards.reverse();
    // Функция создания одной карточки
    function createCardElement(item) {
      const card = new Card(item, templateSelector.elementTemplate, {
        handleCardClick: () => {
          popupZoom.open(item);
        },
        handleCardLikeClick: (id) => {
          console.log(id, 'is liked');
        },
        handleCardDeleteClick: (id) => {
          popupWithSubmit.setSubmitAction(() => {
            apiManager.deleteItem(id)
              .then(res => {
                card.
            })
          });
          popupWithSubmit.open();
        }
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }

    // Cоздания экземпляра для рендеринга массива карточек
    const cardList = new Section(
      {
        data: cards,
        renderer: (item) => {
          createCardElement(item);
        },
      },
      containerSelector.elements
    );

    // Рендеринг карточек
    cardList.renderItems();

    // Создания экземпляра попап-формы для добавления карточки
    const popupNewPlaceForm = new PopupWithForm(popupSelector.popupNewPlace, {
      submitForm: (formData) => {
        console.log('Submitting...', formData);

        popupNewPlaceForm.updateSubmitButtonTitle('Добавление...');
        apiManager.createItem(formData)
          .then((serverItem) => {
            console.log('Card is added', serverItem);

            createCardElement(serverItem);
            popupNewPlaceForm.close();
          })
          .catch(() => {
            alert('Ошибка добавления');
          })
          .finally(() => {
            popupNewPlaceForm.updateSubmitButtonTitle('Создать mesto');
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
  });


apiManager.getUserInfo()
  .then(userInfo => {
    userInfoProfile.setUserInfo(userInfo);
  });