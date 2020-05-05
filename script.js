// Задаем константы

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const textProfile = document.querySelector('.profile__text');
const subtextProfile = document.querySelector('.profile__subtext');
const formElement = document.querySelector('.popup__form');
const name = document.querySelector('#name');
const object = document.querySelector('#object');
const popupTitle = document.querySelector('.popup__text');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomImage = document.querySelector('.popup-zoom__image');
const popupZoomCaption = document.querySelector('.popup-zoom__caption');
const popupZoomCloseButton = document.querySelector('.popup-zoom__close-button')


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


// Добавление карточек(элементов)

function makeCards(item) {
    const cardTemplate = document.querySelector('#card-template').content;
    const elements = document.querySelector('.elements');
    let cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__text').textContent = item.name;
    cardElement.querySelector('.element__image').src = item.link;
    cardElement.querySelector('.element__image').alt = cardElement.querySelector('.element__text').textContent;

    elements.prepend(cardElement);
    makeLikeActive();
    removeCard();
    imageZoom();
};

cards.forEach(makeCards);


// Включение лайков
function makeLikeActive() {
    const likeButton = document.querySelector('.element__like-button');
    likeButton.addEventListener('click', function () {
    likeButton.classList.toggle('element__like-button_active');
});
}

// Удаление карточек(элементов)
function removeCard() {
    const removeButton = document.querySelector('.element__remove-button'); 
    removeButton.addEventListener('click', function() {
    const deleteElement = removeButton.closest('.element');
    deleteElement.remove();
});
}    

// Zoom карточки при нажатии
function imageZoom() {
    const imageElement = document.querySelector('.element__image');
    imageElement.addEventListener('click', function() {  
    console.log(imageElement);
    popupZoomImage.src = imageElement.src;
    popupZoomCaption.textContent = imageElement.alt;
    popupZoom.classList.toggle('popup-zoom_opened');
});
}


// Очищение значений в поп-ап
function popupCleanValues() {
    name.value = null;
    object.value = null;
}

// Открытие поп-ап редактирования профиля

function popupOpenEdit() {
    popup.classList.add('popup_opened');

    popupTitle.textContent = 'Редактировать профиль';
    name.placeholder = 'ФИО';
    object.placeholder = 'Призвание';
    submitButton.textContent = 'Сохранить';
    name.value = textProfile.textContent; // данные строки отвечают за установку исходных name/job в  форму input
    object.value = subtextProfile.textContent;
    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
     formElement.addEventListener('submit', formSubmitHandler);
};



// Закрытие поп-ап редактирования профиля

function popupClose() {
    popup.classList.remove('popup_opened');


};

// Открытие поп-ап нового места

function popupOpenNewPlace() {
    popupCleanValues();
    popup.classList.add('popup_opened');

    popupTitle.textContent = 'Новое место';
    submitButton.textContent = 'Создать mesto';
    name.placeholder = 'Название';
    object.placeholder = 'Ccылка на картинку';
    formElement.addEventListener('submit', formAddHandler);
};

// Закрытие поп-ап изображения

function popupZoomClose() {
    popupZoom.classList.remove('popup-zoom_opened');
}

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

    textProfile.textContent = name.value; 
    subtextProfile.textContent = object.value;
    popupClose();
    formElement.removeEventListener("submit", formSubmitHandler);
    formElement.removeEventListener("submit", formAddHandler);
}

// Обработчик добавления новых карточек.
function formAddHandler (evt) {
    evt.preventDefault();
    cards.push( {name: name.value, link: object.value });
    makeCards(cards[cards.length -1]);

    popupClose();
    formElement.removeEventListener("submit", formSubmitHandler);
    formElement.removeEventListener("submit", formAddHandler);
}


// Слушатели поп-ап

editButton.addEventListener ('click', popupOpenEdit);
closeButton.addEventListener ('click', popupClose);
addButton.addEventListener ('click', popupOpenNewPlace);
popupZoomCloseButton.addEventListener ('click', popupZoomClose)