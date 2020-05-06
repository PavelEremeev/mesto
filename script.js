// Задаем константы

const popup = document.querySelector('.popup');
const elements = document.querySelector('.elements');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const closeButtonPlace = document.querySelector('.popup__close-button_newplace');
const addButton = document.querySelector('.profile__add-button');
const submitButton = document.querySelector('.popup__submit-button');
const textProfile = document.querySelector('.profile__text');
const subtextProfile = document.querySelector('.profile__subtext');
const formElement = document.querySelector('.popup__form');
const name = document.querySelector('.popup__input_name');
const job = document.querySelector('.popup__input_job');
const popupTitle = document.querySelector('.popup__text');
const popupZoom = document.querySelector('.popup-zoom');
const popupZoomImage = document.querySelector('.popup-zoom__image');
const popupZoomCaption = document.querySelector('.popup-zoom__caption');
const popupZoomCloseButton = document.querySelector('.popup-zoom__close-button');
const popupNewPlace = document.querySelector('.popup_newplace');
const formElementPlace = document.querySelector('.popup__form_newplace');
const placeInput = document.querySelector('.popup__input_newplace_name');
const linkInput = document.querySelector('.popup__input_newplace_link');



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

// Zoom  (увеличения) карточки при нажатии
function imageZoom() {
    const imageElement = document.querySelector('.element__image');
    popupZoomCloseButton.addEventListener ('click', popupZoomOpenClose);
    imageElement.addEventListener('click', function() {  
    popupZoomImage.src = imageElement.src;
    popupZoomCaption.textContent = imageElement.alt;
    popupZoomOpenClose();     
});
}

// Закрытие/открытие поп-ап Zoom (увеличения)

function popupZoomOpenClose() {
    popupZoom.classList.toggle('popup-zoom_opened');
}


// поп-ап редактирования профиля

function popupEdit() {
    popupEditOpenClose()
    name.value = textProfile.textContent; // данные строки отвечают за установку исходных name/job в  форму input
    job.value = subtextProfile.textContent;
    // Прикрепляем обработчик к форме:
    // он будет следить за событием “submit” - «отправка»
     formElement.addEventListener('submit', formSubmitHandler);
};



// Закрытие/открытие поп-ап редактирования профиля

function popupEditOpenClose() {
    popup.classList.toggle('popup_opened');


};

// Открытие поп-ап нового места

function popupAddPlace() {
    popupAddPlaceOpenClose()
    formElementPlace.addEventListener('submit', formAddHandler);

};

// поп-ап нового места

function popupAddPlaceOpenClose() {
    popupNewPlace.classList.toggle('popup_opened');

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

    textProfile.textContent = name.value; 
    subtextProfile.textContent = job.value;
    popupEditOpenClose();
}

// Обработчик добавления новых карточек.
function formAddHandler (evt) {
    evt.preventDefault();
    //cards.push( {name: name.value, link: object.value });
    //makeCards(cards[cards.length -1]);
    const card = makeCards(placeInput.value , linkInput.value);
    elements.append(card);

    placeInput.value = '';
    linkInput.value = '';
    popupAddPlaceOpenClose()
}


// Слушатели поп-ап
editButton.addEventListener ('click', popupEdit);
closeButton.addEventListener ('click', popupEditOpenClose);
addButton.addEventListener ('click', popupAddPlace);
closeButtonPlace.addEventListener('click', popupAddPlaceOpenClose);
