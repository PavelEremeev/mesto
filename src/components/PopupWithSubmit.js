import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, { handleSubmitCallback }) {
        super(popupSelector);

        this._handleSubmitCallback = handleSubmitCallback;
    }

    setSubmitAction(submitAction) {
        this._handleSubmitCallback = submitAction;
    }
}