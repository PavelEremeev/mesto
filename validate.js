const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: '.popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
};

// Добавляем класс ошибки элементу input
const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

// Удаляем класс ошибки элементу input
const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = null;
};


// Проверка ввода на валидность
const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement,inputElement, inputElement.validationMessage, obj);
    }else {
        hideInputError(formElement,inputElement, obj);
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
const toggleButtonState = (inputList, buttonElement, obj) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

// Слушатели для формы
const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  
    // проверка состояния кнопки в самом начале
    toggleButtonState(inputList, buttonElement, obj);

    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement, obj);
        });
    });
};

// Включение валидации всего
const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
        formList.forEach((formElement) => {
            setEventListeners(formElement, obj);
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);


