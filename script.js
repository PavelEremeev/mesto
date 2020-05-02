// Задаем константы

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const textProfile = document.querySelector('.profile__text');
const subtextProfile = document.querySelector('.profile__subtext');
const formElement = document.querySelector('.popup__form');
const name = document.querySelector('#name');
const object = document.querySelector('#object');
const popupTitle = document.querySelector('.popup__text');


const cards = [
    {
        name: 'Франция',
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
    


    
// Включение лайков
    
const likeButton = cardElement.querySelector('.element__like-button');

    likeButton.addEventListener ('click', function () {

    likeButton.classList.toggle('element__like-button_active');
    }); 

// Удаление карточек(элементов)
    
const removeButton = cardElement.querySelector('.element__remove-button');

    removeButton.addEventListener('click', function() {

    deleteElement = removeButton.closest('.element');
    deleteElement.remove();
    });

    elements.append(cardElement);

};

cards.forEach(makeCards);


// Открытие поп-ап редактирования профиля

function popupOpen() {
        popup.classList.add('popup_opened');
        popupTitle.textContent = 'Редактировать профиль';
        name.placeholder = 'ФИО';
        object.placeholder = 'Призвание';
        name.value = textProfile.textContent; // данные строки отвечают за установку исходных name/job в  форму input
        object.value = subtextProfile.textContent;
};



// Закрытие поп-ап редактирования профиля

function popupClose() {
    popup.classList.remove('popup_opened');


};

// Открытие поп-ап нового места

function popupOpenNewPlace() {
    popup.classList.add('popup_opened');

    titleProfile.textContent = 'Новое место';
    nameInput.textContent = 'Название';
    jobInput.textContent = 'Ccылка на картинку';
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
    subtextProfile.textContent = object.value;



    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

// Слушатели поп-ап

editButton.addEventListener ('click', popupOpen);
closeButton.addEventListener ('click', popupClose);
addButton.addEventListener ('click', popupOpenNewPlace);
