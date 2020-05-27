const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    inputErrorSelector: '.popup__input_type_error',
    errorClass: 'popup__input-error_active' 
};

// Добавляем класс ошибки элементу input
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Удаляем класс ошибки элементу input
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = null;    
};

// Удаляем ошибки input при повторном открытии
const hideInputErrors = (formElement, config) => {
    const allErroredInputs = formElement.querySelectorAll(config.inputErrorSelector);

    allErroredInputs.forEach((item) => hideInputError(formElement, item, config));
};

// Проверка ввода на валидность
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement,inputElement, inputElement.validationMessage, config);
    }else {
        hideInputError(formElement,inputElement, config);
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
const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
};

const setButtonState = (buttonElement, config, isActive) => {
    if (isActive === true) {
        buttonElement.classList.remove(config.inactiveButtonClass);
    } else {
        buttonElement.classList.add(config.inactiveButtonClass);
    }
};

// Слушатели для формы
const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    // проверка состояния кнопки в самом начале
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach ((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

// Включение валидации всего
const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
        formList.forEach((formElement) => {
            setEventListeners(formElement, config);
    });
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationConfig);


