// Задаем переменные

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let profile = document.querySelector('.profile');
let nameProfile = document.querySelector('.profile__text');
let jobProfile = document.querySelector('.profile__subtext');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');


// Открытие поп-ап

function popupOpen() {
        popup.classList.add('popup_opened');
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
}

// Закрытие поп-ап

function popupClose() {
    popup.classList.remove('popup_opened');

}

// Слушатели поп-ап

editButton.addEventListener ('click', popupOpen);
closeButton.addEventListener ('click', popupClose);

// Находим форму в DOM
let formElement = document.querySelector('.popup__form');

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

    nameProfile.textContent = nameInput.value; 
    jobProfile.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);