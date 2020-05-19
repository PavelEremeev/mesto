// Добавляем класс ошибки элементу input
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// Удаляем класс ошибки элементу input
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = null;
};

// Проверка ввода на валидность

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement,inputElement, inputElement.validationMessage);
    }else {
        hideInputError(formElement,inputElement);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
    // Если поле не валидно, вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    });

};

//  Изменение состояниея кнопки в зависимости от валидности
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__submit-button_inactive');
    } else {
        buttonElement.classList.remove('popup__submit-button_inactive');
    }
}
// Слушатели для формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__submit-button');
  
    // проверка состояния кнопки в самом начале
    toggleButtonState(inputList, buttonElement);

    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: '.popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  });



// Включение валидации всего
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach ((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

