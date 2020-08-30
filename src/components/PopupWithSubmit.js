import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleSubmitCallback }) {
        super(popupSelector);
        this._buttonElement = this._popupElement.querySelector(".popup__submit-button");
        this._handleSubmitCallback = handleSubmitCallback;
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }

    setEventListeners() {
        this._buttonElement.addEventListener("click", (evt) => {
            evt.preventDefault()
            this._handleSubmitCallback();
        })
        super.setEventListeners();
    }
}