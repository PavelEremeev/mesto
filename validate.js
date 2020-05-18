const errorElement = formElement.querySelector(`#${inputElement.id}-error`)


// Добавляем класс ошибки элементу input
const showInputError = (formElement, inputElement, errorMessage) => {
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

// Удаляем класс ошибки элементу input
const hideInputError = (formElement, inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = null;
};

const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement,inputElement, inputElement.validationMessage);
    }else {
        hideInputError(formElement,inputElement);
    }
};

const setEventListeners = ()


formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
});

formInput.addEventListener('input', function () {
    checkInputValidity();
});