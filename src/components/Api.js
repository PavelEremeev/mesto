export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }

  updateUserInfo(formData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }

  updateUserImage(formData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }

  getItems() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }

  deleteItem(item) {
    return fetch(`${this._baseUrl}/cards/${item._id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }

  rateItem(cardId, isLiked) {
    let methodValue;
    isLiked ? (methodValue = "DELETE") : (methodValue = "PUT");
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: methodValue,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка при добавлении лайка :( ${res.status}`);
    });
  }

  //   putLike(cardId) {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       method: "PUT",
  //       headers: this._headers,
  //     }).then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка при добавлении лайка :( ${res.status}`);
  //     });
  //   }

  //   deleteLike(cardId) {
  //     return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
  //       method: "DELETE",
  //       headers: this._headers,
  //     }).then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //       return Promise.reject(`Ошибка при удалении лайка :( ${res.status}`);
  //     });
  //   }

  createItem(item) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(item),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так! :( ${res.status}`);
    });
  }
}
