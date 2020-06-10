const popupZoom = document.querySelector('.popup_zoom');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const cards = [
    {
        name: 'Париж',
        link: 'https://images.unsplash.com/photo-1562815243-3e7c83b4b4a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    },
    {
        name: 'Сидней',
        link: 'https://images.unsplash.com/photo-1525755596908-8f1446d13044?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
    },
    {
        name: 'Тула',
        link: 'https://versiya.info/uploads/posts/2017-12/1512743766_40.jpg'
    },
    {
        name: 'Москва',
        link: 'https://images.unsplash.com/photo-1512495039889-52a3b799c9bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Бали',
        link: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


class Card {
    constructor(item, templateSelector) {
        this._title = item.title;
        this._image = item.image;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        _setEventListeners();
        const cardElementImage = this._element.querySelector('.element__image');
        const cardElementText = this._element.querySelector('.element__text');

        cardElementText.textContent = this._title;
        cardElementImage.src = this._image;
        cardElementImage.alt = cardElementText.textContent;

        return this._element;
    }

    _setEventListeners() {
        const likeButton = this._element.querySelector('.element__like-button');
        const removeButton = this._element.querySelector('.element__remove-button');
        const cardElementImage = this._element.querySelector('.element__image');

        likeButton.addEventListener('click', this._handleLikeButtonClick);
        removeButton.addEventListener('click', this._handleRemoveButtonClick);
        cardElementImage.addEventListener('click', () => this._handleImageElementClick(cardElementImage));
    }

    _handleLikeButtonClick() {
        event.target.classList.toggle('element__like-button_active'); 
    }

    _handleRemoveButtonClick() {
        const deleteElement = event.target.closest('.element');
        deleteElement.remove();
    }

    _handleImageElementClick() {
        popupZoom.classList.add('popup_opened');
        popupImage.src = this._image.src;
        popupCaption.textContent = this._title.alt;

    }
    cards.forEach((item) => {
        const card = new Card(item);
        const cardElement = card.generateCard();

        document.body.prepend(cardElement);
    });
}
