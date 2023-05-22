import apiFindings from "./apiFindings";

class Api {
  constructor({ link, headers }) {
    this._link = link;
    this._headers = headers;
  }
  _processingServerResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`код ошибки: ${res.status}`);
    }
  }
  getInitialCards() {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
    }).then(this._processingServerResponse);
  }
  addNewCard(name, link) {
    return fetch(`${this._link}cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    }).then(this._processingServerResponse);
  }
  deleteCard(cardId) {
    return fetch(`${this._link}cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._processingServerResponse);
  }
  getUserData() {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
    }).then(this._processingServerResponse);
  }
  sendUserData(userName, userAbout) {
    return fetch(`${this._link}users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ name: userName, about: userAbout }),
    }).then(this._processingServerResponse);
  }
  sendAvatarData(avatarLink) {
    return fetch(`${this._link}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar: avatarLink.avatar }),
    }).then(this._processingServerResponse);
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: "PUT",
      }).then(this._processingServerResponse);
    } else {
      return fetch(`${this._link}cards/${cardId}/likes`, {
        headers: this._headers,
        method: "DELETE",
      }).then(this._processingServerResponse);
    }
  }
}

const apiConnect = new Api(apiFindings);
export default apiConnect;
