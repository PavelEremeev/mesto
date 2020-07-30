class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._inputErrorSelector = config.inputErrorSelector;
    this._errorClass = config.errorClass;
    this._formSelector = config.formSelector;
    this._form = form;
  }

  // Добавляем класс ошибки элементу input
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // Удаляем класс ошибки элементу input
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = null;
  }

  // Удаляем ошибки input при повторном открытии
  _hideInputErrors() {
    const allErroredInputs = this._form.querySelectorAll(
      this._inputErrorSelector
    );

    allErroredInputs.forEach((item) => this._hideInputError(item));
  }

  // Проверка ввода на валидность
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // Если поле не валидно, вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  //  Изменение состояниея кнопки в зависимости от валидности
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  //_setButtonInactive(buttonElement) {
  //  buttonElement.classList.add(this._inactiveButtonClass);
  //  buttonElement.disabled = true;
  //}

  // Слушатели для формы
  _setEventListeners() {
    const inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._form.querySelector(this._submitButtonSelector);

    // проверка состояния кнопки в самом начале

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    //this._setButtonInactive(buttonElement);
  }

  // Включение валидации всего
  enableValidation() {
    this._setEventListeners();
    this._hideInputErrors();
  }
}

export { FormValidator };
