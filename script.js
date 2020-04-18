// Задаем переменные

let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let nameProfile = document.querySelector('.popup__input_name');
let jobProfile = document.querySelector('.popup__input_job');
let profile = document.querySelector('.profile');

// Открытие поп-ап

function popupOpen() {
        popup.classList.add('popup_opened');
        nameProfile.value = profile.querySelector('.profile__text').textContent;
        jobProfile.value = profile.querySelector('.profile__subtext').textContent;
}

// Закрытие поп-ап

function popupClose() {
    popup.classList.remove('popup_opened');
}

// Слушатели поп-ап

editButton.addEventListener ('click', popupOpen);
closeButton.addEventListener ('click', popupClose);

// Находим форму в DOM
let formElement = document.querySelector('.popup__submit-button');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.


    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent

    profile.querySelector('.profile__text').textContent = nameProfile.value; 
    profile.querySelector('.profile__subtext').textContent = jobProfile.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);