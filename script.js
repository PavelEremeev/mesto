// Задаем переменные

const elements = document.querySelector('.elements');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const closeButtonNewPlace = document.querySelector('.popup__close-button_new-place');
const closeButtonZoom = document.querySelector('.popup__close-button_zoom');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const textProfile = document.querySelector('.profile__text');
const subtextProfile = document.querySelector('.profile__subtext');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const placeInput = document.querySelector('.popup__input_new-place_name');
const linkInput = document.querySelector('.popup__input_new-place_link');
const popup = document.querySelector('.popup');
const popupTitle = document.querySelector('.popup__text');
const popupInputError = document.querySelector('.popup__input-error');
const popupTypeError = document.querySelector('.popup__input_type_error');
const popupZoom = document.querySelector('.popup_zoom');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupNewPlace = document.querySelector('.popup_new-place');
const formElement = document.querySelector('.popup__form');
const formElementNewPlace = document.querySelector('.popup__form_new-place');
const cards = [
    {
        name: 'Париж',
        link: 'https://images.unsplash.com/photo-1562815243-3e7c83b4b4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Сидней',
        link: 'https://images.unsplash.com/photo-1525755596908-8f1446d13044?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
    },
    {
        name: 'Тула',
        link: 'https://versiya.info/uploads/posts/2017-12/1512743766_40.jpg'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Бали',
        link: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// Открытие поп-ап

function openPopup(popupName) {
    popupName.classList.add('popup_opened');

};

// Закрытие поп-ап

function closePopup(popupName) {
    popupName.classList.remove('popup_opened');
    popupInputError.textContent = null;
};

//  Закрытие по нажатию на Esc

function closePopupAtEscape(evt) {
    if (evt.key === 'Escape') {
        closePopup(popup); 
        closePopup(popupNewPlace);
        closePopup(popupImage);   
    }
};


// Включение лайков
function handleLikeButtonClick(event) {
    event.target.classList.toggle('element__like-button_active');
};

// Удаление карточек(элементов)
function handleRemoveButtonClick(event) {
    const deleteElement = event.target.closest('.element');
    deleteElement.remove();
};   

// Zoom  (Увеличение) карточки при нажатии
function handleImageElementClick(imageElement) {
    openPopup(popupZoom);

    popupImage.src = imageElement.src;
    popupCaption.textContent = imageElement.alt;
   
};

// Создание карточки (элемента)

function createCard(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__text').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = cardElement.querySelector('.element__text').textContent;

    const likeButton = cardElement.querySelector('.element__like-button');
    likeButton.addEventListener('click', handleLikeButtonClick);
    
    const removeButton = cardElement.querySelector('.element__remove-button'); 
    removeButton.addEventListener('click', handleRemoveButtonClick);

    const imageElement = cardElement.querySelector('.element__image');
    imageElement.addEventListener('click', (openPopup) => handleImageElementClick(imageElement));

    return cardElement;

};

// Добавление карточки (элемента)

function addCard(cardElement) {
    elements.prepend(createCard(cardElement));   
};

// Перебор посредством forEach

cards.forEach(cardElement => addCard(cardElement));

// поп-ап редактирования профиля

function editPopup() {
    openPopup(popup);
    nameInput.value = textProfile.textContent; // данные строки отвечают за установку исходных name/job в  форму input
    jobInput.value = subtextProfile.textContent;
};

// Открытие поп-ап нового места

function editPopupNewPlace() {
    openPopup(popupNewPlace);
    placeInput.value = null;
    linkInput.value = null;
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    textProfile.textContent = nameInput.value; 
    subtextProfile.textContent = jobInput.value;
    closePopup(popup);
};

// Обработчик добавления новых карточек.
function formAddHandler (evt) {
    evt.preventDefault();
    const card = createCard( { name: placeInput.value, link: linkInput.value} );
    elements.prepend(card);

    closePopup(popupNewPlace);
};


// Обработчик добавления новых карточек.
function formAddHandlerAtEnter (evt) {
    if (evt.key === 'Enter') {
        enableValidation({
            formSelector: '.popup__form',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__submit-button',
            inactiveButtonClass: '.popup__submit-button_inactive',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_active'
          });
        formAddHandler(evt);
    }
};

// Cлушатели сабмитов
formElement.addEventListener('submit', formSubmitHandler);
formElementNewPlace.addEventListener('submit', formAddHandler);

// Слушатели 
editButton.addEventListener ('click', editPopup);
closeButton.addEventListener ('click', () => {
    closePopup(popup);
});
addButton.addEventListener ('click', editPopupNewPlace);
closeButtonNewPlace.addEventListener('click', () => {
    closePopup(popupNewPlace);
});
closeButtonZoom.addEventListener ('click', () => {
    closePopup(popupZoom);
});
popup.addEventListener('click', (evt) => {
    closePopup(evt.target);
});
popupZoom.addEventListener('click', (evt) => {
    closePopup(evt.target);
});
popupNewPlace.addEventListener('click', (evt) => {
    closePopup(evt.target);
});
document.addEventListener('keydown', closePopupAtEscape);
placeInput.addEventListener('keydown' , formAddHandlerAtEnter);
linkInput.addEventListener('keydown' , formAddHandlerAtEnter);