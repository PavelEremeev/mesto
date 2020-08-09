export {
  openPopup,
  closePopup,
  closePopupAtEsc,
  closePopupAtOverlay,
  addPopupCloseEvents,
  removePopupCloseEvents,
};

// Открытие поп-ап
function openPopup(popupName) {
  addPopupCloseEvents();
  popupName.classList.add("popup_opened");
}

// Закрытие поп-ап
function closePopup(popupName) {
  removePopupCloseEvents();
  popupName.classList.remove("popup_opened");
}

//  Закрытие по нажатию на Esc и оверлей
function closePopupAtEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

function closePopupAtOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

// Добавление  слушателей Esc и оверлей
function addPopupCloseEvents() {
  document.addEventListener("mousedown", closePopupAtOverlay);
  document.addEventListener("keydown", closePopupAtEsc);
}

// Cнятие слушателей Esc и оверлей
function removePopupCloseEvents() {
  document.removeEventListener("mousedown", closePopupAtOverlay);
  document.removeEventListener("keydown", closePopupAtEsc);
}
