export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then(res => res.json());
    }

    updateUserInfo(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(formData)
        })
            .then(res => res.json());
    }

    updateUserImage(formData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(formData)
        })
            .then(res => res.json());
    }

    getItems() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
            .then(res => res.json());
    }

    deleteItem(item) {
        return fetch(`${this._baseUrl}/cards/${item._id}`, { method: 'DELETE', headers: this._headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject('Что-то пошло не так! :(')
            });
    }

    createItem(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(item)
        })
            .then(res => res.json());
    }
}